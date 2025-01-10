namespace barber_api.Models
{
    public class Offer
    {
        public int Id { get; set; }
        public required string Label { get; set; }
        public string? Description { get; set; }
        public int Duration { get; set; }
        public decimal Price { get; set; }
    }
}
