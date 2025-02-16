using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using barber_api.Services;

namespace barber_api.Middlewares
{
    public class TokenRefreshMiddleware
    {
        private readonly RequestDelegate _next;

        public TokenRefreshMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task InvokeAsync(HttpContext context, IServiceProvider serviceProvider)
        {
            var accessToken = context.Request.Cookies["MSTOKEN"];
            var refreshToken = context.Request.Cookies["MSRTOKEN"];

            if (string.IsNullOrEmpty(accessToken) && !string.IsNullOrEmpty(refreshToken))
            {
                var authService = serviceProvider.GetRequiredService<AuthService>();
                try
                {
                    var newAccessToken = await authService.RefreshAccessTokenAsync(refreshToken);
                    context.Response.Cookies.Append("MSTOKEN", newAccessToken, new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = true,
                        SameSite = SameSiteMode.None,
                        Expires = DateTime.Now.AddMinutes(30)
                    });

                    context.Request.Headers["Authorization"] = $"Bearer {newAccessToken}";
                }
                catch {}
            }

            await _next(context);
        }
    }
}
