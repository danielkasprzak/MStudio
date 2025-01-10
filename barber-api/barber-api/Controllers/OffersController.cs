using barber_api.Models;
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

        // GET: /offers/get
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Offer>>> Get()
        {
            var offers = await _context.Offers.ToListAsync();
            return Ok(offers);
        }
    }
}
