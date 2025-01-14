using barber_api.Models;
using barber_api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace barber_api.Controllers
{
    [ApiController]
    [Route("reservation")]
    public class ReservationsController : Controller
    {
        private readonly ReservationsService _reservationService;
        private readonly AuthService _authorizationService;
        private readonly ILogger<ReservationsController> _logger;

        public ReservationsController(ReservationsService reservationService, AuthService authorizationService, ILogger<ReservationsController> logger)
        {
            _reservationService = reservationService;
            _authorizationService = authorizationService;
            _logger = logger;
        }


        // GET: /reservation/available
        [HttpGet("available")]
        public async Task<ActionResult<IEnumerable<DateTime>>> GetAvailableTimeSlots([FromQuery] int duration)
        {
            var startDate = DateTime.Now;
            var endDate = startDate.AddDays(14);

            var availableTimeSlots = await _reservationService.GetAvailableTimeSlotsAsync(startDate, endDate, duration);
            return Ok(availableTimeSlots);
        }

        // GET: /reservation
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> Get([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var reservations = await _reservationService.GetReservationsAsync(startDate, endDate);
            return Ok(reservations);
        }

        // GET: /reservation/my
        [HttpGet("my")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetByEmail()
        {
            var email = _authorizationService.GetEmailFromToken();
            if (string.IsNullOrEmpty(email))
            {
                return Unauthorized("User is not authenticated.");
            }

            var reservations = await _reservationService.GetReservationsByEmailAsync(email);
            return Ok(reservations);
        }

        // GET: /reservation/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetById(string id)
        {
            var reservation = await _reservationService.GetReservationByIdAsync(id);
            if (reservation == null)
            {
                return NotFound("Reservation not found.");
            }
            return Ok(reservation);
        }

        // POST: /reservation
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Reservation>> Add([FromBody] Reservation reservation)
        {
            if (reservation == null)
            {
                return BadRequest("Invalid reservation data.");
            }

            var email = _authorizationService.GetEmailFromToken();
            if (string.IsNullOrEmpty(email))
            {
                return Unauthorized("User is not authenticated.");
            }

            reservation.Email = email;

            var isAvailable = await _reservationService.IsTimeSlotAvailableAsync(reservation.ReservationDateTime, reservation.Duration);
            if (!isAvailable)
            {
                return Conflict("The time slot is not available.");
            }

            try
            {
                await _reservationService.AddReservationAsync(reservation);
                return CreatedAtAction(nameof(GetById), new { id = reservation.ReservationId }, reservation);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding reservation");
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: /reservation/admin
        [HttpPost("admin")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Reservation>> AddByAdmin([FromBody] Reservation reservation)
        {
            if (reservation == null)
            {
                return BadRequest("Invalid reservation data.");
            }

            var isAvailable = await _reservationService.IsTimeSlotAvailableAsync(reservation.ReservationDateTime, reservation.Duration);
            if (!isAvailable)
            {
                return Conflict("The time slot is not available.");
            }

            try
            {
                await _reservationService.AddReservationAsync(reservation);
                return CreatedAtAction(nameof(GetById), new { id = reservation.ReservationId }, reservation);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding reservation");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: /reservation/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(string id, [FromBody] Reservation reservation)
        {
            if (reservation == null || id != reservation.ReservationId)
            {
                return BadRequest("Invalid reservation data.");
            }

            var existingReservation = await _reservationService.GetReservationByIdAsync(id);
            if (existingReservation == null)
            {
                return NotFound("Reservation not found.");
            }

            try
            {
                await _reservationService.UpdateReservationAsync(reservation);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating reservation");
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: /reservation/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(string id)
        {
            var existingReservation = await _reservationService.GetReservationByIdAsync(id);
            if (existingReservation == null)
            {
                return NotFound("Reservation not found.");
            }

            try
            {
                await _reservationService.DeleteReservationAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting reservation");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}

