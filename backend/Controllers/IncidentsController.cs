using IncidentReporter.Api.Data;
using IncidentReporter.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IncidentReporter.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IncidentsController : ControllerBase
{
    private readonly AppDbContext _db;

    public IncidentsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<IncidentResponse>>> GetAll()
    {
        var incidents = await _db.Incidents
            .OrderByDescending(i => i.IncidentDate)
            .ToListAsync();
        return Ok(incidents.Select(ToResponse));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<IncidentResponse>> GetById(int id)
    {
        var incident = await _db.Incidents.FindAsync(id);
        return incident is null ? NotFound() : Ok(ToResponse(incident));
    }

    [HttpPost]
    public async Task<ActionResult<IncidentResponse>> Create([FromBody] IncidentRequest dto)
    {
        var incident = new Incident
        {
            WorkerName = dto.WorkerName,
            EmployerName = dto.EmployerName,
            IncidentType = dto.IncidentType,
            Severity = dto.Severity,
            IncidentDate = dto.IncidentDate,
            Description = dto.Description,
            Status = dto.Status ?? IncidentStatus.Open,
            CreatedAt = DateTime.UtcNow
        };

        _db.Incidents.Add(incident);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = incident.Id }, ToResponse(incident));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] IncidentRequest dto)
    {
        var incident = await _db.Incidents.FindAsync(id);
        if (incident is null) return NotFound();

        incident.WorkerName = dto.WorkerName;
        incident.EmployerName = dto.EmployerName;
        incident.IncidentType = dto.IncidentType;
        incident.Severity = dto.Severity;
        incident.IncidentDate = dto.IncidentDate;
        incident.Description = dto.Description;
        if (dto.Status.HasValue) incident.Status = dto.Status.Value;
        incident.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var incident = await _db.Incidents.FindAsync(id);
        if (incident is null) return NotFound();

        _db.Incidents.Remove(incident);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    private static IncidentResponse ToResponse(Incident i) => new(
        i.Id, i.WorkerName, i.EmployerName, i.IncidentType, i.Severity,
        i.IncidentDate, i.Description, i.Status, i.CreatedAt, i.UpdatedAt);
}