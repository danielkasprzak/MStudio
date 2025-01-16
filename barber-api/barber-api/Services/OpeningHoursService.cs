using barber_api.Data;
using barber_api.Models;
using Microsoft.EntityFrameworkCore;

namespace barber_api.Services
{
    public class OpeningHoursService
    {
        private readonly AppDbContext _context;

        public OpeningHoursService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<OpeningHour>> GetOpeningHoursAsync()
        {
            return await _context.OpeningHours.ToListAsync();
        }

        public async Task<OpeningHour?> GetOpeningHourByDayAsync(string dayOfWeek)
        {
            return await _context.OpeningHours.FindAsync(dayOfWeek);
        }

        public async Task UpdateOpeningHourAsync(OpeningHour openingHour)
        {
            var existingEntity = await _context.OpeningHours.FindAsync(openingHour.DayOfWeek);
            if (existingEntity != null)
            {
                _context.Entry(existingEntity).State = EntityState.Detached;
            }

            _context.OpeningHours.Update(openingHour);
            await _context.SaveChangesAsync();
        }
    }
}

