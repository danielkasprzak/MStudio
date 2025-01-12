using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

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
        Console.WriteLine($"Received code: {code}");

        var idToken = await ExchangeAuthorizationCodeForIdTokenAsync(code);

        var payload = await GoogleJsonWebSignature.ValidateAsync(idToken, new GoogleJsonWebSignature.ValidationSettings
        {
            Audience = new[] { _configuration["Authentication:Google:ClientId"] }
        });

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, payload.Subject),
            new Claim(JwtRegisteredClaimNames.Email, payload.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var adminEmails = _configuration.GetSection("AdminEmails").Get<List<string>>();
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

        _httpContextAccessor.HttpContext.Response.Cookies.Append("AuthToken", token, cookieOptions);
    }

    private async Task<string> ExchangeAuthorizationCodeForIdTokenAsync(string authorizationCode)
    {
        var clientId = _configuration["Authentication:Google:ClientId"];
        var clientSecret = _configuration["Authentication:Google:ClientSecret"];
        var redirectUri = _configuration["Authentication:Google:RedirectUri"];

        Console.WriteLine(redirectUri);

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

        return tokenResponse.IdToken;
    }

    public List<string> CheckAuth()
    {
        var user = _httpContextAccessor.HttpContext.User;
        if (user == null || !user.Identity.IsAuthenticated)
        {
            return null;
        }

        var roles = user.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
        return roles;
    }
}

public class GoogleTokenResponse
{
    [JsonPropertyName("id_token")]
    public required string IdToken { get; set; }
}
