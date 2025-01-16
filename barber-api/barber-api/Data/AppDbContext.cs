using barber_api.Models;
using Microsoft.EntityFrameworkCore;

namespace barber_api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<OpeningHour> OpeningHours { get; set; }
        public DbSet<SpecialOpeningHour> SpecialOpeningHours { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OpeningHour>().HasKey(oh => oh.DayOfWeek);
            modelBuilder.Entity<SpecialOpeningHour>().HasKey(soh => soh.Date);

            modelBuilder.Entity<Offer>().Property(o => o.Id).ValueGeneratedOnAdd();
        }
    }
}