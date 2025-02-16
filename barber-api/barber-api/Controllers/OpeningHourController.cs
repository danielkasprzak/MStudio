using barber_api.Models;
using barber_api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace barber_api.Controllers
{
    [ApiController]
    [Route("openinghours")]
    public class OpeningHourController : ControllerBase
    {
        private readonly IOpeningHourService _openingHoursService;
        private readonly ILogger<OpeningHourController> _logger;

        public OpeningHourController(IOpeningHourService openingHoursService, ILogger<OpeningHourController> logger)
        {
            _openingHoursService = openingHoursService;
            _logger = logger;
        }

        // GET: /openinghours
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OpeningHour>>> Get()
        {
            var openingHours = await _openingHoursService.GetOpeningHoursAsync();
            return Ok(openingHours);
        }

        // GET: /openinghours/{dayOfWeek}
        [HttpGet("{dayOfWeek}")]
        public async Task<ActionResult<OpeningHour>> GetByDay(string dayOfWeek)
        {
            var openingHour = await _openingHoursService.GetOpeningHourByDayAsync(dayOfWeek);
            if (openingHour == null)
            {
                return NotFound("Opening hour not found.");
            }
            return Ok(openingHour);
        }

        // PUT: /openinghours/{dayOfWeek}
        [HttpPut("{dayOfWeek}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> Update(string dayOfWeek, [FromBody] OpeningHour openingHour)
        {
            if (openingHour == null || dayOfWeek != openingHour.DayOfWeek)
            {
                return BadRequest("Invalid opening hour data.");
            }

            var existingOpeningHour = await _openingHoursService.GetOpeningHourByDayAsync(dayOfWeek);
            if (existingOpeningHour == null)
            {
                return NotFound("Opening hour not found.");
            }

            try
            {
                await _openingHoursService.UpdateOpeningHourAsync(openingHour);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating opening hour");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}

