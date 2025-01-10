namespace barber_api.Models
{
    public class Reservation
    {
        public required string ReservationId { get; set; }
        public required string Email { get; set; }
        public required string Services { get; set; }
        public int Duration { get; set; }
        public DateTime ReservationDateTime { get; set; }
        public required string Phone { get; set; }

    }
}
