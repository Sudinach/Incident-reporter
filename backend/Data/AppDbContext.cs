using IncidentReporter.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace IncidentReporter.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Incident> Incidents => Set<Incident>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Store enums as readable strings, not ints — same as @Enumerated(EnumType.STRING)
        modelBuilder.Entity<Incident>()
            .Property(e => e.IncidentType)
            .HasConversion<string>()
            .HasMaxLength(32);

        modelBuilder.Entity<Incident>()
            .Property(e => e.Severity)
            .HasConversion<string>()
            .HasMaxLength(16);

        modelBuilder.Entity<Incident>()
            .Property(e => e.Status)
            .HasConversion<string>()
            .HasMaxLength(16);
    }
}