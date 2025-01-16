namespace barber_api.Models
{
    public class SpecialOpeningHour
    {
        public required DateOnly Date { get; set; }
        public DateOnly? EndDate { get; set; }
        public bool IsOpen { get; set; }
        public TimeSpan OpenHour { get; set; }
        public TimeSpan CloseHour { get; set; }
    }
}
