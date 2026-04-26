export const INCIDENT_TYPES = [
  "Slip",
  "Fall",
  "Strain",
  "Cut",
  "BurnOrScald",
  "ElectricShock",
  "Other",
] as const;
export type IncidentType = (typeof INCIDENT_TYPES)[number];

export const SEVERITIES = ["Low", "Medium", "High", "Critical"] as const;
export type Severity = (typeof SEVERITIES)[number];

export const STATUSES = ["Open", "UnderReview", "Closed"] as const;
export type IncidentStatus = (typeof STATUSES)[number];

export type Incident = {
  id: number;
  workerName: string;
  employerName: string;
  incidentType: IncidentType;
  severity: Severity;
  incidentDate: string; 
  description: string;
  status: IncidentStatus;
  createdAt: string;
  updatedAt: string | null;
};

export type IncidentInput = {
  workerName: string;
  employerName: string;
  incidentType: IncidentType;
  severity: Severity;
  incidentDate: string;
  description: string;
  status?: IncidentStatus;
};


export const INCIDENT_TYPE_LABELS: Record<IncidentType, string> = {
  Slip: "Slip",
  Fall: "Fall",
  Strain: "Strain",
  Cut: "Cut",
  BurnOrScald: "Burn or Scald",
  ElectricShock: "Electric Shock",
  Other: "Other",
};

export const STATUS_LABELS: Record<IncidentStatus, string> = {
  Open: "Open",
  UnderReview: "Under Review",
  Closed: "Closed",
};