using barber_api.Models;
using Microsoft.EntityFrameworkCore;

namespace barber_api.Services
{
    public class ReservationsService
    {
        private readonly AppDbContext _context;
        private readonly OffersService _offersService;

        public ReservationsService(AppDbContext context, OffersService offersService)
        {
            _context = context;
            _offersService = offersService;
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
            var selectedServiceIds = reservation.Services.Split(',').Select(int.Parse);
            var offers = await _offersService.GetOffersByIdsAsync(selectedServiceIds);
            reservation.Duration = offers.Sum(o => o.Duration);
            reservation.Price = offers.Sum(o => o.Price);

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

        public async Task<IEnumerable<DateTime>> GetAvailableTimeSlotsAsync(DateTime startDate, DateTime endDate, int duration)
        {
            var availableTimeSlots = new List<DateTime>();

            var openingHours = await _context.OpeningHours.ToListAsync();
            var specialOpeningHours = await _context.SpecialOpeningHours.ToListAsync();
            var reservations = await _context.Reservations
                .Where(r => r.ReservationDateTime >= startDate && r.ReservationDateTime <= endDate)
                .ToListAsync();

            for (var date = startDate.Date; date <= endDate.Date; date = date.AddDays(1))
            {
                var dayOfWeek = date.DayOfWeek.ToString();
                var specialOpeningHour = specialOpeningHours.FirstOrDefault(soh => soh.Date.Date <= date && (soh.EndDate == null || soh.EndDate.Value.Date >= date));
                OpeningHour openingHour = null;

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

                    for (var time = startTime; time < endTime; time = time.AddMinutes(30))
                    {
                        if (!reservations.Any(r => r.ReservationDateTime < time.AddMinutes(duration) && r.ReservationDateTime.AddMinutes(r.Duration) > time))
                        {
                            availableTimeSlots.Add(time);
                        }
                    }
                }
            }

            return availableTimeSlots;
        }
    }
}

