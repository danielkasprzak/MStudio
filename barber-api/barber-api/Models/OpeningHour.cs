namespace barber_api.Models
{
    public class OpeningHour
    {
        public string DayOfWeek { get; set; }
        public bool IsOpen { get; set; }
        public DateTime OpenHour { get; set; }
        public DateTime CloseHour { get; set; }
    }
}
