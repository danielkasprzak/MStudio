using barber_api.Data;
using barber_api.Models;
using Microsoft.EntityFrameworkCore;

namespace barber_api.Services
{
    public class ReservationService : IReservationService
    {
        private readonly AppDbContext _context;

        public ReservationService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Reservation>> GetReservationsAsync(DateTime? startDate = null, DateTime? endDate = null)
        {
            var query = _context.Reservations.AsQueryable();

            if (startDate.HasValue)
            {
                query = query.Where(r => r.ReservationDateTime >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(r => r.ReservationDateTime <= endDate.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<Reservation?> GetReservationByIdAsync(string reservationId)
        {
            return await _context.Reservations.FindAsync(reservationId);
        }

        public async Task<bool> IsTimeSlotAvailableAsync(DateTime dateTime, int duration)
        {
            var conflictingReservation = await _context.Reservations
                .Where(r => !r.IsCancelled && r.ReservationDateTime < dateTime.AddMinutes(duration) && r.ReservationDateTime.AddMinutes(r.Duration) > dateTime)
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
            var existingReservation = await _context.Reservations.FindAsync(reservation.ReservationId);
            if (existingReservation != null)
            {
                _context.Entry(existingReservation).State = EntityState.Detached;
            }

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

        public async Task<IEnumerable<DateTime>> GetAvailableTimeSlotsAsync(DateTime startDate, DateTime endDate, int duration)
        {
            var availableTimeSlots = new List<DateTime>();

            var openingHours = await _context.OpeningHours.ToListAsync();
            var specialOpeningHours = await _context.SpecialOpeningHours.ToListAsync();
            var reservations = await _context.Reservations
                .Where(r => r.ReservationDateTime >= startDate && r.ReservationDateTime <= endDate && !r.IsCancelled)
                .ToListAsync();

            var now = DateTime.Now;

            for (var date = startDate.Date; date <= endDate.Date; date = date.AddDays(1))
            {
                var dayOfWeek = date.DayOfWeek.ToString();
                var specialOpeningHour = specialOpeningHours.FirstOrDefault(soh => soh.Date <= DateOnly.FromDateTime(date)
                && (soh.EndDate == null || soh.EndDate.Value >= DateOnly.FromDateTime(date)));
                OpeningHour? openingHour = null;

                if (specialOpeningHour != null)
                {
                    openingHour = new OpeningHour
                    {
                        DayOfWeek = dayOfWeek,
                        IsOpen = specialOpeningHour.IsOpen,
                        OpenHour = specialOpeningHour.OpenHour,
                        CloseHour = specialOpeningHour.CloseHour
                    };
                }
                else
                {
                    openingHour = openingHours.FirstOrDefault(oh => oh.DayOfWeek == dayOfWeek);
                }

                if (openingHour != null && openingHour.IsOpen)
                {
                    var startTime = date.Add(openingHour.OpenHour);
                    var endTime = date.Add(openingHour.CloseHour);

                    for (var time = startTime; time <= endTime.AddMinutes(-duration); time = time.AddMinutes(30))
                    {
                        if (date == now.Date && time < now)
                        {
                            continue;
                        }

                        if (!reservations.Any(r => r.ReservationDateTime < time.AddMinutes(duration) && r.ReservationDateTime.AddMinutes(r.Duration) > time))
                        {
                            availableTimeSlots.Add(time);
                        }
                    }
                }
            }

            return availableTimeSlots;
        }

        public async Task<IEnumerable<Reservation>> GetReservationsByEmailAsync(string email)
        {
            return await _context.Reservations
                .Where(r => r.Email == email)
                .ToListAsync();
        }

        public async Task CancelReservationAsync(string reservationId)
        {
            var reservation = await _context.Reservations.FindAsync(reservationId);
            if (reservation != null)
            {
                reservation.IsCancelled = true;
                await _context.SaveChangesAsync();
            }
        }
    }
}

