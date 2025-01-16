using barber_api.Data;
using barber_api.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace barber_api.Services
{
    public class StatisticsService
    {
        private readonly AppDbContext _context;

        public StatisticsService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetTotalReservations(DateTime startDate, DateTime endDate)
        {
            return await _context.Reservations
                .Where(r => r.ReservationDateTime >= startDate && r.ReservationDateTime <= endDate)
                .CountAsync();
        }

        public async Task<decimal> GetTotalPayments(DateTime startDate, DateTime endDate)
        {
            return await _context.Reservations
                .Where(r => r.ReservationDateTime >= startDate && r.ReservationDateTime <= endDate)
                .SumAsync(r => r.Price);
        }

        public async Task<decimal> GetAveragePayment(DateTime startDate, DateTime endDate)
        {
            return await _context.Reservations
                .Where(r => r.ReservationDateTime >= startDate && r.ReservationDateTime <= endDate)
                .AverageAsync(r => r.Price);
        }

        public async Task<(decimal totalPayments, decimal averagePayment)> GetPaymentsStatistics(DateTime startDate, DateTime endDate)
        {
            var totalPayments = await GetTotalPayments(startDate, endDate);
            var averagePayment = await GetAveragePayment(startDate, endDate);
            return (totalPayments, averagePayment);
        }

        public async Task<IQueryable<Offer>> GetMostPopularOffers(DateTime startDate, DateTime endDate)
        {
            var popularOffers = _context.Reservations
                .Where(r => r.ReservationDateTime >= startDate && r.ReservationDateTime <= endDate)
                .AsEnumerable() // Switch to client-side evaluation
                .SelectMany(r => JsonConvert.DeserializeObject<List<ReservedOffer>>(r.Services))
                .GroupBy(o => o.Id)
                .OrderByDescending(g => g.Count())
                .Select(g => g.Key)
                .Take(5)
                .ToList();

            var offers = _context.Offers
                .Where(o => popularOffers.Contains(o.Id))
                .AsQueryable();

            return offers;
        }
    }

    public class ReservedOffer
    {
        public int Id { get; set; }
        public string Label { get; set; }
        public decimal Price { get; set; }
        public int Time { get; set; }
        public int Quantity { get; set; }
    }
}
