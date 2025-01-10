namespace barber_api.Models
{
    public class Reservation
    {
        public string ReservationId { get; set; }
        public string Email { get; set; }
        public string Services { get; set; }
        public int Duration { get; set; }
        public DateTime ReservationDateTime { get; set; }
        public string Phone { get; set; }

    }
}
