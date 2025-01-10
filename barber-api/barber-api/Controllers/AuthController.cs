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
        var token = await _authService.AuthenticateWithGoogleAsync(request.Code);
        return Ok(new { token });
    }
}

public class GoogleLoginRequest
{
    public required string Code { get; set; }
}
