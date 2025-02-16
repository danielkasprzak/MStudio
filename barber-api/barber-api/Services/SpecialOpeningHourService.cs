using barber_api.Models;
using barber_api.Data;
using Microsoft.EntityFrameworkCore;

namespace barber_api.Services
{
    public class SpecialOpeningHourService : ISpecialOpeningHourService
    {
        private readonly AppDbContext _context;

        public SpecialOpeningHourService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SpecialOpeningHour>> GetSpecialOpeningHoursAsync()
        {
            return await _context.SpecialOpeningHours.ToListAsync();
        }

        public async Task<SpecialOpeningHour?> GetSpecialOpeningHourByDateAsync(DateOnly date)
        {
            return await _context.SpecialOpeningHours.FindAsync(date);
        }

        public async Task AddSpecialOpeningHourAsync(SpecialOpeningHour specialOpeningHour)
        {
            await _context.SpecialOpeningHours.AddAsync(specialOpeningHour);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSpecialOpeningHourAsync(DateOnly originalDate, SpecialOpeningHour specialOpeningHour)
        {
            var existingEntity = await _context.SpecialOpeningHours.FindAsync(originalDate);
            if (existingEntity == null)
                throw new DbUpdateConcurrencyException("The record you attempted to edit was not found. The record may have been deleted or modified by another user.");
            

            _context.Entry(existingEntity).State = EntityState.Detached;
            _context.SpecialOpeningHours.Update(specialOpeningHour);
            await _context.SaveChangesAsync();
        }
        
        public async Task DeleteSpecialOpeningHourAsync(DateOnly date)
        {
            var specialOpeningHour = await _context.SpecialOpeningHours.FindAsync(date);
            if (specialOpeningHour != null)
            {

                _context.SpecialOpeningHours.Remove(specialOpeningHour);
                await _context.SaveChangesAsync();
            }
        }
    }
}


