using barber_api.Models;
using Microsoft.EntityFrameworkCore;

namespace barber_api.Services
{
    public class SpecialOpeningHoursService
    {
        private readonly AppDbContext _context;

        public SpecialOpeningHoursService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SpecialOpeningHour>> GetSpecialOpeningHoursAsync()
        {
            return await _context.SpecialOpeningHours.ToListAsync();
        }

        public async Task<SpecialOpeningHour?> GetSpecialOpeningHourByDateAsync(DateTime date)
        {
            var utcDate = date.ToUniversalTime();
            return await _context.SpecialOpeningHours.FindAsync(utcDate);
        }

        public async Task AddSpecialOpeningHourAsync(SpecialOpeningHour specialOpeningHour)
        {
            specialOpeningHour.Date = specialOpeningHour.Date.ToUniversalTime();
            if (specialOpeningHour.EndDate.HasValue)
            {
                specialOpeningHour.EndDate = specialOpeningHour.EndDate.Value.ToUniversalTime();
            }
            await _context.SpecialOpeningHours.AddAsync(specialOpeningHour);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSpecialOpeningHourAsync(SpecialOpeningHour specialOpeningHour)
        {
            specialOpeningHour.Date = specialOpeningHour.Date.ToUniversalTime();
            if (specialOpeningHour.EndDate.HasValue)
            {
                specialOpeningHour.EndDate = specialOpeningHour.EndDate.Value.ToUniversalTime();
            }
            var existingEntity = await _context.SpecialOpeningHours.FindAsync(specialOpeningHour.Date);
            if (existingEntity != null)
            {
                _context.Entry(existingEntity).State = EntityState.Detached;
            }

            _context.SpecialOpeningHours.Update(specialOpeningHour);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSpecialOpeningHourAsync(DateTime date)
        {
            var utcDate = date.ToUniversalTime();
            var specialOpeningHour = await _context.SpecialOpeningHours.FindAsync(utcDate);
            if (specialOpeningHour != null)
            {
                _context.SpecialOpeningHours.Remove(specialOpeningHour);
                await _context.SaveChangesAsync();
            }
        }
    }
}

