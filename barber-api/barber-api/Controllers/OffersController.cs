using barber_api.Models;
using barber_api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace barber_api.Controllers
{
    [ApiController]
    [Route("offers")]
    public class OffersController : Controller
    {
        private readonly OffersService _offersService;
        private readonly ILogger<OffersController> _logger;

        public OffersController(OffersService offersService, ILogger<OffersController> logger)
        {
            _offersService = offersService;
            _logger = logger;
        }

        // GET: /offers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Offer>>> Get()
        {
            var offers = await _offersService.GetOffersAsync();
            return Ok(offers);
        }

        // GET: /offers/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Offer>> GetById(int id)
        {
            var offer = await _offersService.GetOfferByIdAsync(id);
            if (offer == null)
            {
                return NotFound("Offer not found.");
            }
            return Ok(offer);
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
                await _offersService.AddOfferAsync(offer);
                return CreatedAtAction(nameof(Get), new { id = offer.Id }, offer);
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

            var existingOffer = await _offersService.GetOfferByIdAsync(id);
            if (existingOffer == null)
            {
                return NotFound("Offer not found.");
            }

            try
            {
                await _offersService.UpdateOfferAsync(offer);
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
            var existingOffer = await _offersService.GetOfferByIdAsync(id);
            if (existingOffer == null)
            {
                return NotFound("Offer not found.");
            }

            try
            {
                await _offersService.DeleteOfferAsync(id);
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

