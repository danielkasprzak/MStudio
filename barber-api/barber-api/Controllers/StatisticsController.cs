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
            return Ok(new { totalReservations });
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
    }
}
