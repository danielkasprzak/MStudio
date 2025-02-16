using Microsoft.AspNetCore.Mvc;
using barber_api.Services;

namespace barber_api.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
        {
            await _authService.AuthenticateWithGoogleAsync(request.Code);
            return Ok(new { message = "Authenticated successfully" });
        }

        [HttpGet("check")]
        public IActionResult CheckAuth()
        {
            var roles = _authService.CheckAuth();
            if (roles == null)
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
