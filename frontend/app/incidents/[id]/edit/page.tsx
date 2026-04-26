import { notFound } from "next/navigation";
import { incidentsApi, ApiError } from "@/lib/api";
import { IncidentForm } from "@/components/organisms/IncidentForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditIncidentPage({ params }: Props) {
  const { id } = await params;
  const idNum = Number(id);
  if (Number.isNaN(idNum)) notFound();

  let incident;
  try {
    incident = await incidentsApi.get(idNum);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) notFound();
    throw e;
  }

  return (
    <IncidentForm
      incidentId={incident.id}
      initialValues={{
        workerName: incident.workerName,
        employerName: incident.employerName,
        incidentType: incident.incidentType,
        severity: incident.severity,
        incidentDate: incident.incidentDate.slice(0, 10), // YYYY-MM-DD for <input type="date">
        description: incident.description,
        status: incident.status,
      }}
    />
  );
}
