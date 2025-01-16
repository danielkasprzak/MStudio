namespace barber_api.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
        {
            await _authService.AuthenticateWithGoogleAsync(request.Code);
            return Ok(new { message = "Authenticated successfully" });
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["MSRTOKEN"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                return Unauthorized("Refresh token is missing.");
            }

            try
            {
                var newAccessToken = await _authService.RefreshAccessTokenAsync(refreshToken);
                return Ok(new { accessToken = newAccessToken });
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("check")]
        public IActionResult CheckAuth()
        {
            var roles = _authService.CheckAuth();
            if (roles == null || roles.Count == 0)
            {
                return Unauthorized();
            }

            return Ok(new { roles });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            _authService.ClearAuthCookies();
            return Ok(new { message = "Logged out successfully" });
        }
    }

    public class GoogleLoginRequest
    {
        public required string Code { get; set; }
    }
}
