using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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
        var refreshToken = Request.Cookies["REFRESH_TOKEN"];
        if (string.IsNullOrEmpty(refreshToken))
        {
            return Unauthorized("Refresh token is missing.");
        }

        try
        {
            var newAccessToken = await _authService.RefreshAccessTokenAsync(refreshToken);
            return Ok(new { accessToken = newAccessToken });
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error");
        }
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
}

public class GoogleLoginRequest
{
    public required string Code { get; set; }
}
