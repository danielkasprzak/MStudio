using barber_api.Models;

namespace barber_api.Services
{
    public interface IStatisticsService
    {
        Task<int> GetTotalReservations(DateTime startDate, DateTime endDate);
        Task<decimal> GetTotalPayments(DateTime startDate, DateTime endDate);
        Task<decimal> GetAveragePayment(DateTime startDate, DateTime endDate);
        Task<Dictionary<int, decimal>> GetDailyAveragePayments(DateTime startDate, DateTime endDate);
        Task<Dictionary<int, decimal>> GetWeeklyAveragePayments(DateTime startDate, DateTime endDate);
        Task<Dictionary<int, decimal>> GetMonthlyAveragePayments(DateTime startDate, DateTime endDate);
        Task<Dictionary<int, decimal>> GetYearlyAveragePayments(DateTime startDate, DateTime endDate);
        Task<(decimal totalPayments, decimal averagePayment)> GetPaymentsStatistics(DateTime startDate, DateTime endDate);
        Task<List<int>> GetMostPopularReservationHours(DateTime startDate, DateTime endDate);
        Task<List<string>> GetMostPopularDaysOfWeek(DateTime startDate, DateTime endDate);
        Task<int> GetCancelledReservationsCount(DateTime startDate, DateTime endDate);
        Task<int> GetCompletedReservationsCount(DateTime startDate, DateTime endDate);
        Task<int> GetActiveReservationsCount(DateTime startDate, DateTime endDate);
        Task<double> GetAverageReservationDuration(DateTime startDate, DateTime endDate);
        Task<IQueryable<Offer>> GetMostPopularOffers(DateTime startDate, DateTime endDate);
    }
}
