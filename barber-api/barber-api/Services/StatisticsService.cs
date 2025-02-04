using barber_api.Data;
using barber_api.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Globalization;
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

        public async Task<Dictionary<int, decimal>> GetDailyAveragePayments(DateTime startDate, DateTime endDate)
        {
            var reservations = await _context.Reservations
                .Where(r => r.ReservationDateTime >= startDate && r.ReservationDateTime <= endDate)
                .ToListAsync();

            var dailyPayments = reservations
                .GroupBy(r => (r.ReservationDateTime - startDate).Days)
                .Select(g => new { Day = g.Key, AveragePayment = g.Average(r => r.Price) })
                .ToDictionary(g => g.Day, g => g.AveragePayment);

            var result = new Dictionary<int, decimal>();
            for (var day = 0; day <= (endDate - startDate).Days; day++)
            {
                result[day] = dailyPayments.ContainsKey(day) ? dailyPayments[day] : 0;
            }

            return result;
        }



        public async Task<Dictionary<int, decimal>> GetWeeklyAveragePayments(DateTime startDate, DateTime endDate)
        {
            var reservations = await _context.Reservations
                .Where(r => r.ReservationDateTime >= startDate && r.ReservationDateTime <= endDate)
                .ToListAsync();

            var weeklyPayments = reservations
                .GroupBy(r => (CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(r.ReservationDateTime, CalendarWeekRule.FirstDay, DayOfWeek.Monday) - CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(startDate, CalendarWeekRule.FirstDay, DayOfWeek.Monday)))
                .Select(g => new { Week = g.Key, AveragePayment = g.Average(r => r.Price) })
                .ToDictionary(g => g.Week, g => g.AveragePayment);

            var result = new Dictionary<int, decimal>();
            var totalWeeks = (endDate - startDate).Days / 7;
            for (var week = 0; week <= totalWeeks; week++)
            {
                result[week] = weeklyPayments.ContainsKey(week) ? weeklyPayments[week] : 0;
            }

            return result;
        }


        public async Task<Dictionary<int, decimal>> GetMonthlyAveragePayments(DateTime startDate, DateTime endDate)
        {
            var reservations = await _context.Reservations
                .Where(r => r.ReservationDateTime >= startDate && r.ReservationDateTime <= endDate)
                .ToListAsync();

            var monthlyPayments = reservations
                .GroupBy(r => ((r.ReservationDateTime.Year - startDate.Year) * 12) + r.ReservationDateTime.Month - startDate.Month)
                .Select(g => new { Month = g.Key, AveragePayment = g.Average(r => r.Price) })
                .ToDictionary(g => g.Month, g => g.AveragePayment);

            var result = new Dictionary<int, decimal>();
            var totalMonths = ((endDate.Year - startDate.Year) * 12) + endDate.Month - startDate.Month;
            for (var month = 0; month <= totalMonths; month++)
            {
                result[month] = monthlyPayments.ContainsKey(month) ? monthlyPayments[month] : 0;
            }

            return result;
        }



        public async Task<Dictionary<int, decimal>> GetYearlyAveragePayments(DateTime startDate, DateTime endDate)
        {
            var reservations = await _context.Reservations
                .Where(r => r.ReservationDateTime >= startDate && r.ReservationDateTime <= endDate)
                .ToListAsync();

            var yearlyPayments = reservations
                .GroupBy(r => r.ReservationDateTime.Year - startDate.Year)
                .Select(g => new { Year = g.Key, AveragePayment = g.Average(r => r.Price) })
                .ToDictionary(g => g.Year, g => g.AveragePayment);

            var result = new Dictionary<int, decimal>();
            var totalYears = endDate.Year - startDate.Year;
            for (var year = 0; year <= totalYears; year++)
            {
                result[year] = yearlyPayments.ContainsKey(year) ? yearlyPayments[year] : 0;
            }

            return result;
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
