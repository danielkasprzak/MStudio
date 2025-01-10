using barber_api.Models;
using Microsoft.EntityFrameworkCore;

namespace barber_api.Services
{
    public class ReservationsService
    {
        private readonly AppDbContext _context;

        public ReservationsService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Reservation>> GetReservationsAsync()
        {
            return await _context.Reservations.ToListAsync();
        }

        public async Task<Reservation> GetReservationByIdAsync(string reservationId)
        {
            return await _context.Reservations.FindAsync(reservationId);
        }

        public async Task<bool> IsTimeSlotAvailableAsync(DateTime dateTime, int duration)
        {
            var conflictingReservation = await _context.Reservations
                .Where(r => r.ReservationDateTime < dateTime.AddMinutes(duration) && r.ReservationDateTime.AddMinutes(r.Duration) > dateTime)
                .FirstOrDefaultAsync();

            return conflictingReservation == null;
        }

        public async Task AddReservationAsync(Reservation reservation)
        {
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateReservationAsync(Reservation reservation)
        {
            _context.Reservations.Update(reservation);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteReservationAsync(string reservationId)
        {
            var reservation = await _context.Reservations.FindAsync(reservationId);
            if (reservation != null)
            {
                _context.Reservations.Remove(reservation);
                await _context.SaveChangesAsync();
            }
        }
    }
}

