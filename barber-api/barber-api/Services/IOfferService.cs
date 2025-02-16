using barber_api.Models;

namespace barber_api.Services
{
    public interface IOfferService
    {
        Task<IEnumerable<Offer>> GetOffersAsync();
        Task<Offer?> GetOfferByIdAsync(int id);
        Task AddOfferAsync(Offer offer);
        Task UpdateOfferAsync(Offer offer);
        Task DeleteOfferAsync(int id);
    }
}
