using System.Text.Json.Serialization;
using IncidentReporter.Api.Data;
using IncidentReporter.Api.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

const string FrontendCorsPolicy = "AllowFrontend";
builder.Services.AddCors(options =>
{
    options.AddPolicy(FrontendCorsPolicy, policy =>
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();

    if (!db.Incidents.Any())
    {
        db.Incidents.AddRange(
            new Incident
            {
                WorkerName = "Jane Smith",
                EmployerName = "Acme Construction",
                IncidentType = IncidentType.Slip,
                Severity = Severity.Medium,
                IncidentDate = DateTime.UtcNow.AddDays(-5),
                Description = "Slipped on wet floor near loading bay; minor knee bruise.",
                Status = IncidentStatus.UnderReview
            },
            new Incident
            {
                WorkerName = "Tom Nguyen",
                EmployerName = "Brisbane Logistics",
                IncidentType = IncidentType.Strain,
                Severity = Severity.Low,
                IncidentDate = DateTime.UtcNow.AddDays(-2),
                Description = "Lower back strain while lifting a 25kg box.",
                Status = IncidentStatus.Open
            },
            new Incident
            {
                WorkerName = "Priya Patel",
                EmployerName = "Sunshine Coast Cafes",
                IncidentType = IncidentType.BurnOrScald,
                Severity = Severity.High,
                IncidentDate = DateTime.UtcNow.AddDays(-10),
                Description = "Burn from steam wand; treated on-site, follow-up required.",
                Status = IncidentStatus.Closed
            }
        );
        db.SaveChanges();
    }
}

app.UseHttpsRedirection();
app.UseCors(FrontendCorsPolicy);
app.UseAuthorization();
app.MapControllers();

app.Run();