using barber_api.Data;
using barber_api.Models;
using Microsoft.EntityFrameworkCore;

namespace barber_api.Services
{
    public class OfferService
    {
        private readonly AppDbContext _context;

        public OfferService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Offer>> GetOffersAsync()
        {
            return await _context.Offers.ToListAsync();
        }

        public async Task<Offer?> GetOfferByIdAsync(int id)
        {
            return await _context.Offers.FindAsync(id);
        }

        public async Task AddOfferAsync(Offer offer)
        {
            _context.Offers.Add(offer);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateOfferAsync(Offer offer)
        {
            var existingOffer = await _context.Offers.FindAsync(offer.Id);
            if (existingOffer != null)
            {
                _context.Entry(existingOffer).State = EntityState.Detached;
            }

            _context.Offers.Update(offer);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteOfferAsync(int id)
        {
            var offer = await _context.Offers.FindAsync(id);
            if (offer != null)
            {
                _context.Offers.Remove(offer);
                await _context.SaveChangesAsync();
            }
        }
    }
}

