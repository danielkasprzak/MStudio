using barber_api.Models;
using barber_api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace barber_api.Controllers
{
    [ApiController]
    [Route("specialopeninghours")]
    public class SpecialOpeningHourController : ControllerBase
    {
        private readonly SpecialOpeningHourService _service;

        public SpecialOpeningHourController(SpecialOpeningHourService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetSpecialOpeningHours()
        {
            var specialOpeningHours = await _service.GetSpecialOpeningHoursAsync();
            return Ok(specialOpeningHours);
        }

        [HttpGet("{date}")]
        public async Task<IActionResult> GetSpecialOpeningHourByDate(DateOnly date)
        {
            var specialOpeningHour = await _service.GetSpecialOpeningHourByDateAsync(date);
            if (specialOpeningHour == null)
            {
                return NotFound();
            }
            return Ok(specialOpeningHour);
        }

        [HttpPost]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> AddSpecialOpeningHour(SpecialOpeningHour specialOpeningHour)
        {
            await _service.AddSpecialOpeningHourAsync(specialOpeningHour);
            return CreatedAtAction(nameof(GetSpecialOpeningHourByDate), new { date = specialOpeningHour.Date }, specialOpeningHour);
        }

        [HttpPut("{date}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> UpdateSpecialOpeningHour(DateOnly date, SpecialOpeningHour specialOpeningHour)
        {
            try { 
            
                await _service.UpdateSpecialOpeningHourAsync(date, specialOpeningHour);
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound("The record you attempted to edit was not found. The record may have been deleted or modified by another user.");
            }
        }

        [HttpDelete("{date}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> DeleteSpecialOpeningHour(DateOnly date)
        {
            try
            {
                await _service.DeleteSpecialOpeningHourAsync(date);
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound("The record you attempted to delete was not found. The record may have been deleted or modified by another user.");
            }
        }
    }
}

