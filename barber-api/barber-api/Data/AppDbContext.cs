using barber_api.Models;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Reservation> Reservations { get; set; }
    public DbSet<Offer> Offers { get; set; }
    public DbSet<OpeningHour> OpeningHours { get; set; }    
    
}