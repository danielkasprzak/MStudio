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
            var utcDate = DateTime.SpecifyKind(date.Date.AddHours(12), DateTimeKind.Utc);
            return await _context.SpecialOpeningHours.FindAsync(utcDate);
        }

        public async Task AddSpecialOpeningHourAsync(SpecialOpeningHour specialOpeningHour)
        {
            Console.Write("BEZ TIMEZONE - ", specialOpeningHour.Date.ToString());

            specialOpeningHour.Date = DateTime.SpecifyKind(specialOpeningHour.Date, DateTimeKind.Utc);
            if (specialOpeningHour.EndDate.HasValue)
            {
                specialOpeningHour.EndDate = DateTime.SpecifyKind(specialOpeningHour.EndDate.Value, DateTimeKind.Utc);
            }

            Console.Write("Z TIMEZONE - ", specialOpeningHour.Date.ToString());

            //specialOpeningHour.Date = DateTime.SpecifyKind(specialOpeningHour.Date.Date.AddHours(12), DateTimeKind.Utc);
            //if (specialOpeningHour.EndDate.HasValue)
            //{
            //    specialOpeningHour.EndDate = DateTime.SpecifyKind(specialOpeningHour.EndDate.Value.Date.AddHours(12), DateTimeKind.Utc);
            //}
            await _context.SpecialOpeningHours.AddAsync(specialOpeningHour);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSpecialOpeningHourAsync(DateTime originalDate, SpecialOpeningHour specialOpeningHour)
        {
            var utcOriginalDate = DateTime.SpecifyKind(originalDate.Date.AddHours(12), DateTimeKind.Utc);
            specialOpeningHour.Date = DateTime.SpecifyKind(specialOpeningHour.Date.Date.AddHours(12), DateTimeKind.Utc);
            if (specialOpeningHour.EndDate.HasValue)
            {
                specialOpeningHour.EndDate = DateTime.SpecifyKind(specialOpeningHour.EndDate.Value.Date.AddHours(12), DateTimeKind.Utc);
            }

            var existingEntity = await _context.SpecialOpeningHours.FindAsync(utcOriginalDate);
            if (existingEntity == null)
            {
                throw new DbUpdateConcurrencyException("The record you attempted to edit was not found. The record may have been deleted or modified by another user.");
            }

            _context.Entry(existingEntity).State = EntityState.Detached;
            _context.SpecialOpeningHours.Update(specialOpeningHour);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSpecialOpeningHourAsync(DateTime date)
        {
            var utcDate = DateTime.SpecifyKind(date.Date.AddHours(12), DateTimeKind.Utc);
            var specialOpeningHour = await _context.SpecialOpeningHours.FindAsync(utcDate);
            if (specialOpeningHour != null)
            {
                _context.SpecialOpeningHours.Remove(specialOpeningHour);
                await _context.SaveChangesAsync();
            }
        }
    }
}


