using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using barber_api.Services;
using System;
using System.Threading.Tasks;

namespace barber_api.Controllers
{
    [ApiController]
    [Route("statistics")]
    [Authorize(Policy = "AdminOnly")]
    public class StatisticsController : ControllerBase
    {
        private readonly StatisticsService _statisticsService;

        public StatisticsController(StatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }

        [HttpGet("reservations")]
        public async Task<IActionResult> GetTotalReservations([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var totalReservations = await _statisticsService.GetTotalReservations(startDate, endDate);
            var cancelledReservations = await _statisticsService.GetCancelledReservationsCount(startDate, endDate);
            var completedReservations = await _statisticsService.GetCompletedReservationsCount(startDate, endDate);
            var activeReservations = await _statisticsService.GetActiveReservationsCount(startDate, endDate);

            return Ok(new
            {
                totalReservations,
                cancelledReservations,
                completedReservations,
                activeReservations
            });
        }

        [HttpGet("financial")]
        public async Task<IActionResult> GetAveragePayment([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var (totalPayments, averagePayment) = await _statisticsService.GetPaymentsStatistics(startDate, endDate);
            return Ok(new { totalPayments, averagePayment });
        }

        [HttpGet("popular-services")]
        public async Task<IActionResult> GetMostPopularServices([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var popularServices = await _statisticsService.GetMostPopularOffers(startDate, endDate);
            return Ok(new { popularServices });
        }

        [HttpGet("most-popular-hours")]
        public async Task<IActionResult> GetMostPopularReservationHours(DateTime startDate, DateTime endDate)
        {
            var result = await _statisticsService.GetMostPopularReservationHours(startDate, endDate);
            return Ok(result);
        }

        [HttpGet("most-popular-days")]
        public async Task<IActionResult> GetMostPopularDaysOfWeek(DateTime startDate, DateTime endDate)
        {
            var result = await _statisticsService.GetMostPopularDaysOfWeek(startDate, endDate);
            return Ok(result);
        }

        [HttpGet("average-duration")]
        public async Task<IActionResult> GetAverageReservationDuration(DateTime startDate, DateTime endDate)
        {
            var result = await _statisticsService.GetAverageReservationDuration(startDate, endDate);
            return Ok(result);
        }
    }
}
