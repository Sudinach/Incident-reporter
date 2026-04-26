import Link from "next/link";
import { incidentsApi } from "@/lib/api";
import { IncidentTable } from "@/components/organisms/IncidentTable";

export default async function IncidentsPage() {
  const incidents = await incidentsApi.list();

  return (
    <section aria-labelledby="incidents-heading">
      <div className="mb-6 flex items-center justify-between">
        <h2 id="incidents-heading" className="text-2xl font-semibold tracking-tight">
          Incidents
        </h2>
        <Link
          href="/incidents/new"
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          New incident
        </Link>
      </div>
      <IncidentTable incidents={incidents} />
    </section>
  );
}