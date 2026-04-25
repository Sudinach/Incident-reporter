using System.ComponentModel.DataAnnotations;

namespace IncidentReporter.Api.Models;

public class IncidentRequest
{
    [Required, MaxLength(100)]
    public string WorkerName { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string EmployerName { get; set; } = string.Empty;

    [Required]
    public IncidentType IncidentType { get; set; }

    [Required]
    public Severity Severity { get; set; }

    [Required]
    public DateTime IncidentDate { get; set; }

    [Required, MaxLength(2000)]
    public string Description { get; set; } = string.Empty;

    public IncidentStatus? Status { get; set; }
}

public record IncidentResponse(
    int Id,
    string WorkerName,
    string EmployerName,
    IncidentType IncidentType,
    Severity Severity,
    DateTime IncidentDate,
    string Description,
    IncidentStatus Status,
    DateTime CreatedAt,
    DateTime? UpdatedAt
);