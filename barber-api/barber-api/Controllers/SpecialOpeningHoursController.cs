using barber_api.Models;
using barber_api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace barber_api.Controllers
{
    [ApiController]
    [Route("specialopeninghours")]
    public class SpecialOpeningHoursController : ControllerBase
    {
        private readonly SpecialOpeningHoursService _service;

        public SpecialOpeningHoursController(SpecialOpeningHoursService service)
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
        public async Task<IActionResult> GetSpecialOpeningHourByDate(DateTime date)
        {
            var specialOpeningHour = await _service.GetSpecialOpeningHourByDateAsync(date);
            if (specialOpeningHour == null)
            {
                return NotFound();
            }
            return Ok(specialOpeningHour);
        }

        [HttpPost]
        public async Task<IActionResult> AddSpecialOpeningHour(SpecialOpeningHour specialOpeningHour)
        {
            await _service.AddSpecialOpeningHourAsync(specialOpeningHour);
            return CreatedAtAction(nameof(GetSpecialOpeningHourByDate), new { date = specialOpeningHour.Date }, specialOpeningHour);
        }

        [HttpPut("{date}")]
        public async Task<IActionResult> UpdateSpecialOpeningHour(DateTime date, SpecialOpeningHour specialOpeningHour)
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
        public async Task<IActionResult> DeleteSpecialOpeningHour(DateTime date)
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

