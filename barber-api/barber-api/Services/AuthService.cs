using Google.Apis.Auth;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace barber_api.Services
{
    public class AuthService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthService(IConfiguration configuration, HttpClient httpClient, IHttpContextAccessor httpContextAccessor)
        {
            _configuration = configuration;
            _httpClient = httpClient;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task AuthenticateWithGoogleAsync(string code)
        {
            var tokenResponse = await ExchangeAuthorizationCodeForIdTokenAsync(code);

            var payload = await GoogleJsonWebSignature.ValidateAsync(tokenResponse.IdToken, new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new[] { _configuration["Authentication:Google:ClientId"] }
            });

            var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, payload.Subject),
            new Claim(JwtRegisteredClaimNames.Email, payload.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("name", payload.Name),
            new Claim("picture", payload.Picture)
        };

            var adminEmails = _configuration.GetSection("AdminEmails").Get<List<string>>() ?? new List<string>();
            if (adminEmails.Contains(payload.Email))
            {
                claims.Add(new Claim(ClaimTypes.Role, "admin"));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            SetTokenCookie(tokenString);

            if (!string.IsNullOrEmpty(tokenResponse.RefreshToken))
            {
                SetRefreshTokenCookie(tokenResponse.RefreshToken);
            }
        }

        private void SetTokenCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.Now.AddMinutes(30)
            };

            _httpContextAccessor.HttpContext?.Response.Cookies.Append("MSTOKEN", token, cookieOptions);
        }

        private void SetRefreshTokenCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.Now.AddDays(14)
            };

            _httpContextAccessor.HttpContext?.Response.Cookies.Append("MSRTOKEN", refreshToken, cookieOptions);
        }

        private async Task<GoogleTokenResponse> ExchangeAuthorizationCodeForIdTokenAsync(string authorizationCode)
        {
            var clientId = _configuration["Authentication:Google:ClientId"];
            var clientSecret = _configuration["Authentication:Google:ClientSecret"];

            if (string.IsNullOrEmpty(clientSecret) || string.IsNullOrEmpty(clientId))
            {
                throw new InvalidOperationException("Client secret is not configured.");
            }

            var requestBody = new Dictionary<string, string>
            {
                { "code", authorizationCode },
                { "client_id", clientId },
                { "client_secret", clientSecret },
                { "redirect_uri", "postmessage" },
                { "grant_type", "authorization_code" }
            };

            var requestContent = new FormUrlEncodedContent(requestBody);

            var response = await _httpClient.PostAsync("https://oauth2.googleapis.com/token", requestContent);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine($"Error response: {responseContent}");
                response.EnsureSuccessStatusCode();
            }

            var tokenResponse = JsonSerializer.Deserialize<GoogleTokenResponse>(responseContent);
            return tokenResponse ?? throw new InvalidOperationException("Token response is null"); ;
        }

        public async Task<string> RefreshAccessTokenAsync(string refreshToken)
        {
            var clientId = _configuration["Authentication:Google:ClientId"];
            var clientSecret = _configuration["Authentication:Google:ClientSecret"];

            if (string.IsNullOrEmpty(clientSecret) || string.IsNullOrEmpty(clientId))
            {
                throw new InvalidOperationException("Client secret is not configured.");
            }

            var requestBody = new Dictionary<string, string>
            {
                { "refresh_token", refreshToken },
                { "client_id", clientId },
                { "client_secret", clientSecret },
                { "grant_type", "refresh_token" }
            };

            var requestContent = new FormUrlEncodedContent(requestBody);

            var response = await _httpClient.PostAsync("https://oauth2.googleapis.com/token", requestContent);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                response.EnsureSuccessStatusCode();
            }

            var tokenResponse = JsonSerializer.Deserialize<GoogleTokenResponse>(responseContent);
            var newAccessToken = tokenResponse?.IdToken ?? throw new InvalidOperationException("IdToken is null");

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(newAccessToken);
            var email = jwtToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Email)?.Value;
            var name = jwtToken.Claims.FirstOrDefault(c => c.Type == "name")?.Value;
            var picture = jwtToken.Claims.FirstOrDefault(c => c.Type == "picture")?.Value;

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, jwtToken.Subject),
                new Claim(JwtRegisteredClaimNames.Email, email ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("name", name ?? string.Empty),
                new Claim("picture", picture ?? string.Empty)

            };

            var adminEmails = _configuration.GetSection("AdminEmails").Get<List<string>>() ?? new List<string>();
            if (adminEmails.Contains(email))
            {
                claims.Add(new Claim(ClaimTypes.Role, "admin"));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var newToken = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            var newTokenString = new JwtSecurityTokenHandler().WriteToken(newToken);

            SetTokenCookie(newTokenString);

            return newTokenString;
        }

        public async Task<List<string>?> CheckAuthAsync()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            if (user == null || user.Identity == null || !user.Identity.IsAuthenticated)
            {
                var refreshToken = _httpContextAccessor.HttpContext?.Request.Cookies["MSRTOKEN"];
                if (!string.IsNullOrEmpty(refreshToken))
                {
                    try
                    {
                        var newAccessToken = await RefreshAccessTokenAsync(refreshToken);
                        var handler = new JwtSecurityTokenHandler();
                        var token = handler.ReadJwtToken(newAccessToken);
                        var claims = token.Claims;
                        var identity = new ClaimsIdentity(claims, "jwt");
                        if (_httpContextAccessor.HttpContext != null)
                        {
                            _httpContextAccessor.HttpContext.User = new ClaimsPrincipal(identity);
                            user = _httpContextAccessor.HttpContext.User;
                        }
                    }
                    catch
                    {
                        return null;
                    }
                }
                else
                {
                    return null;
                }
            }

            var roles = user?.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            return roles ?? null;
        }

        public void ClearAuthCookies()
        {
            var context = _httpContextAccessor.HttpContext;
            if (context != null)
            {
                var expiredCookieOptions = new CookieOptions
                {
                    Expires = DateTime.UtcNow.AddDays(-1),
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None
                };

                context.Response.Cookies.Append("MSTOKEN", "", expiredCookieOptions);
                context.Response.Cookies.Append("MSRTOKEN", "", expiredCookieOptions);
            }
        }

        public (string? Email, string? Name, string? Picture) GetUserInfoFromToken()
        {
            var token = _httpContextAccessor.HttpContext?.Request.Cookies["MSTOKEN"];
            if (string.IsNullOrEmpty(token))
            {
                return (null, null, null);
            }

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var emailClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Email);
            var nameClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "name");
            var pictureClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "picture");
            return (emailClaim?.Value, nameClaim?.Value, pictureClaim?.Value);
        }

        public string? GetEmailFromToken()
        {
            var token = _httpContextAccessor.HttpContext?.Request.Cookies["MSTOKEN"];
            if (string.IsNullOrEmpty(token))
            {
                return null;
            }

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var emailClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Email);
            return emailClaim?.Value;
        }
    }

    public class GoogleTokenResponse
    {
        [JsonPropertyName("id_token")]
        public required string IdToken { get; set; }

        [JsonPropertyName("refresh_token")]
        public string? RefreshToken { get; set; }
    }
}