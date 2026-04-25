using System.ComponentModel.DataAnnotations;

namespace IncidentReporter.Api.Models;

public class Incident
{
    public int Id { get; set; }

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

    [Required]
    public IncidentStatus Status { get; set; } = IncidentStatus.Open;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}

public enum IncidentType
{
    Slip,
    Fall,
    Strain,
    Cut,
    BurnOrScald,
    ElectricShock,
    Other
}

public enum Severity
{
    Low,
    Medium,
    High,
    Critical
}

public enum IncidentStatus
{
    Open,
    UnderReview,
    Closed
}