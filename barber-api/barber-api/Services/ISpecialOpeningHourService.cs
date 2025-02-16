using barber_api.Models;

namespace barber_api.Services
{
    public interface ISpecialOpeningHourService
    {
        Task<IEnumerable<SpecialOpeningHour>> GetSpecialOpeningHoursAsync();
        Task<SpecialOpeningHour?> GetSpecialOpeningHourByDateAsync(DateOnly date);
        Task AddSpecialOpeningHourAsync(SpecialOpeningHour specialOpeningHour);
        Task UpdateSpecialOpeningHourAsync(DateOnly originalDate, SpecialOpeningHour specialOpeningHour);
        Task DeleteSpecialOpeningHourAsync(DateOnly date);
    }
}
