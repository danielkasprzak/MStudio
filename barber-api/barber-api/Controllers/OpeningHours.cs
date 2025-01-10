using barber_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace barber_api.Controllers
{
    [ApiController]
    [Route("openinghours")]
    public class OpeningHours : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<OffersController> _logger;

        public OpeningHours(AppDbContext context, ILogger<OffersController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: /openinghours
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OpeningHour>>> Get()
        {
            var openingHours = await _context.OpeningHours.ToListAsync();
            return Ok(openingHours);
        }

        // PUT: /openinghours/{dayOfWeek}
        [HttpPut("{dayOfWeek}")]
        [Authorize]
        public async Task<IActionResult> Update(string dayOfWeek, [FromBody] OpeningHour openingHour)
        {
            if (openingHour == null || dayOfWeek != openingHour.DayOfWeek)
            {
                return BadRequest("Invalid opening hour data.");
            }

            var existingOpeningHour = await _context.OpeningHours.FindAsync(dayOfWeek);
            if (existingOpeningHour == null)
            {
                return NotFound("Opening hour not found.");
            }

            try
            {
                existingOpeningHour.IsOpen = openingHour.IsOpen;
                existingOpeningHour.OpenHour = openingHour.OpenHour;
                existingOpeningHour.CloseHour = openingHour.CloseHour;

                _context.OpeningHours.Update(existingOpeningHour);
                await _context.SaveChangesAsync();
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
