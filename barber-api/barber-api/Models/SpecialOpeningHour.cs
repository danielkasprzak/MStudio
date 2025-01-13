using System.ComponentModel.DataAnnotations.Schema;

public class SpecialOpeningHour
{
    [Column(TypeName = "timestamp without time zone")]
    public required DateTime Date { get; set; }
    [Column(TypeName = "timestamp without time zone")]
    public DateTime? EndDate { get; set; }
    public bool IsOpen { get; set; }
    public TimeSpan OpenHour { get; set; }
    public TimeSpan CloseHour { get; set; }
}
