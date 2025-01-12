public class SpecialOpeningHour
{
  
    public required DateTime Date { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsOpen { get; set; }
    public TimeSpan? OpenHour { get; set; }
    public TimeSpan? CloseHour { get; set; }
}
