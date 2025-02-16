using barber_api.Models;

namespace barber_api.Services
{
    public interface IOpeningHourService
    {
        Task<IEnumerable<OpeningHour>> GetOpeningHoursAsync();
        Task<OpeningHour?> GetOpeningHourByDayAsync(string dayOfWeek);
        Task UpdateOpeningHourAsync(OpeningHour openingHour);
    }
}
