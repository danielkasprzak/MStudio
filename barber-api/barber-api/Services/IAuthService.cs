namespace barber_api.Services
{
    public interface IAuthService
    {
        Task AuthenticateWithGoogleAsync(string code);
        Task<string> RefreshAccessTokenAsync(string refreshToken);
        List<string>? CheckAuth();
        void ClearAuthCookies();
        (string? Email, string? Name, string? Picture) GetUserInfoFromToken();
        string? GetEmailFromToken();
    }
}
