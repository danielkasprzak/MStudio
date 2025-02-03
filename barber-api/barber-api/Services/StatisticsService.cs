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
            var reservations = await _context.Reservations
                .Where(r => r.ReservationDateTime >= startDate && r.ReservationDateTime <= endDate)
                .ToListAsync();

            if (!reservations.Any())
            {
                return 0;
            }

            return reservations.Average(r => r.Price);
        }

        public async Task<(decimal totalPayments, decimal averagePayment)> GetPaymentsStatistics(DateTime startDate, DateTime endDate)
        {
            var totalPayments = await GetTotalPayments(startDate, endDate);
            var averagePayment = await GetAveragePayment(startDate, endDate);
            return (totalPayments, averagePayment);
        }

        public async Task<List<int>> GetMostPopularReservationHours(DateTime startDate, DateTime endDate)
        {
            return await _context.Reservations
                .Where(r => r.ReservationDateTime >= startDate && r.ReservationDateTime <= endDate)
                .GroupBy(r => r.ReservationDateTime.Hour)
                .OrderByDescending(g => g.Count())
                .Select(g => g.Key)
                .ToListAsync();
        }

        public async Task<List<string>> GetMostPopularDaysOfWeek(DateTime startDate, DateTime endDate)
        {
            return await _context.Reservations
                .Where(r => r.ReservationDateTime >= startDate && r.ReservationDateTime <= endDate)
                .GroupBy(r => r.ReservationDateTime.DayOfWeek)
                .OrderByDescending(g => g.Count())
                .Select(g => g.Key.ToString())
                .ToListAsync();
        }

        public async Task<int> GetCancelledReservationsCount(DateTime startDate, DateTime endDate)
        {
            return await _context.Reservations
                .Where(r => r.ReservationDateTime >= startDate && r.ReservationDateTime <= endDate && r.IsCancelled)
                .CountAsync();
        }

        public async Task<int> GetCompletedReservationsCount(DateTime startDate, DateTime endDate)
        {
            return await _context.Reservations
                .Where(r => r.ReservationDateTime >= startDate && r.ReservationDateTime <= endDate && !r.IsCancelled)
                .CountAsync();
        }

        public async Task<int> GetActiveReservationsCount(DateTime startDate, DateTime endDate)
        {
            return await _context.Reservations
                .Where(r => r.ReservationDateTime >= startDate && r.ReservationDateTime <= endDate && !r.IsCancelled && r.ReservationDateTime > DateTime.Now)
                .CountAsync();
        }

        public async Task<double> GetAverageReservationDuration(DateTime startDate, DateTime endDate)
        {
            var reservations = await _context.Reservations
                .Where(r => r.ReservationDateTime >= startDate && r.ReservationDateTime <= endDate)
                .ToListAsync();

            if (!reservations.Any())
            {
                return 0;
            }

            return reservations.Average(r => r.Duration);
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
