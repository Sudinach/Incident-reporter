import { z } from "zod";
import { INCIDENT_TYPES, SEVERITIES, STATUSES } from "./types";

export const incidentSchema = z.object({
  workerName: z
    .string()
    .trim()
    .min(1, "Worker name is required")
    .max(100, "Maximum 100 characters"),
  employerName: z
    .string()
    .trim()
    .min(1, "Employer is required")
    .max(100, "Maximum 100 characters"),
  incidentType: z.enum(INCIDENT_TYPES, {
    message: "Select an incident type",
  }),
  severity: z.enum(SEVERITIES, {
    message: "Select a severity level",
  }),
  incidentDate: z.string().min(1, "Incident date is required"),
  description: z
    .string()
    .trim()
    .min(10, "Provide at least 10 characters of detail")
    .max(2000, "Maximum 2000 characters"),
  status: z.enum(STATUSES).optional(),
});

export type IncidentFormValues = z.infer<typeof incidentSchema>;
