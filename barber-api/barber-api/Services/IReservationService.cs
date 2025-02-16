using barber_api.Models;

namespace barber_api.Services
{
    public interface IReservationService
    {
        Task<IEnumerable<Reservation>> GetReservationsAsync(DateTime? startDate = null, DateTime? endDate = null);
        Task<Reservation?> GetReservationByIdAsync(string reservationId);
        Task<bool> IsTimeSlotAvailableAsync(DateTime dateTime, int duration);
        Task AddReservationAsync(Reservation reservation);
        Task UpdateReservationAsync(Reservation reservation);
        Task DeleteReservationAsync(string reservationId);
        Task<IEnumerable<DateTime>> GetAvailableTimeSlotsAsync(DateTime startDate, DateTime endDate, int duration);
        Task<IEnumerable<Reservation>> GetReservationsByEmailAsync(string email);
        Task CancelReservationAsync(string reservationId);
    }
}