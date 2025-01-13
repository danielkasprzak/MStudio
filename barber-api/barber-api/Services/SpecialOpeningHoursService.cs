using barber_api.Models;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using NpgsqlTypes;
using System.Data;


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
            return await _context.SpecialOpeningHours.FindAsync(date);
        }

        public async Task AddSpecialOpeningHourAsync(SpecialOpeningHour specialOpeningHour)
        {
            


            await _context.SpecialOpeningHours.AddAsync(specialOpeningHour);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSpecialOpeningHourAsync(DateTime originalDate, SpecialOpeningHour specialOpeningHour)
        {
            var existingEntity = await _context.SpecialOpeningHours.FindAsync(originalDate);
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
            var specialOpeningHour = await _context.SpecialOpeningHours.FindAsync(date);
            if (specialOpeningHour != null)
            {

                _context.SpecialOpeningHours.Remove(specialOpeningHour);
                await _context.SaveChangesAsync();
            }
        }
    }
}


