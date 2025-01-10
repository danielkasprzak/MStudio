namespace barber_api.Models
{
    public class OpeningHour
    {
        public required string DayOfWeek { get; set; }
        public bool IsOpen { get; set; }
        public TimeSpan OpenHour { get; set; }
        public TimeSpan CloseHour { get; set; }
    }
}
