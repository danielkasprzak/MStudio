using barber_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace barber_api.Controllers
{
    [ApiController]
    [Route("offers")]
    public class OffersController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<OffersController> _logger;

        public OffersController(AppDbContext context, ILogger<OffersController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: /offers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Offer>>> Get()
        {
            var offers = await _context.Offers.ToListAsync();
            return Ok(offers);
        }

        // POST: /offers
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Offer>> Add([FromBody] Offer offer)
        {
            if (offer == null)
            {
                return BadRequest("Invalid offer data.");
            }

            try
            {
                _context.Offers.Add(offer);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(Get), new { id = offer.Label }, offer);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding offer");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: /offers/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromBody] Offer offer)
        {
            if (offer == null || id != offer.Id)
            {
                return BadRequest("Invalid offer data.");
            }

            var existingOffer = await _context.Offers.FindAsync(id);
            if (existingOffer == null)
            {
                return NotFound("Offer not found.");
            }

            try
            {
                existingOffer.Description = offer.Description;
                existingOffer.Duration = offer.Duration;
                existingOffer.Price = offer.Price;

                _context.Offers.Update(existingOffer);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating offer");
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: /offers/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var existingOffer = await _context.Offers.FindAsync(id);
            if (existingOffer == null)
            {
                return NotFound("Offer not found.");
            }

            try
            {
                _context.Offers.Remove(existingOffer);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting offer");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
