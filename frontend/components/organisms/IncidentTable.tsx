import Link from "next/link";
import type { Incident } from "@/lib/types";
import { INCIDENT_TYPE_LABELS } from "@/lib/types";
import { SeverityBadge } from "@/components/atoms/SeverityBadge";
import { StatusBadge } from "@/components/atoms/StatusBadge";
import { IncidentRowActions } from "@/components/molecules/IncidentRowActions";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function IncidentTable({ incidents }: { incidents: Incident[] }) {
  if (incidents.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center">
        <p className="text-slate-700">No incidents reported yet.</p>
        <Link
          href="/incidents/new"
          className="mt-4 inline-block rounded text-blue-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Report the first incident
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200">
        <caption className="sr-only">
          List of reported workplace incidents, sorted by most recent first.
        </caption>
        <thead className="bg-slate-50">
          <tr>
            <Th>Date</Th>
            <Th>Worker</Th>
            <Th>Employer</Th>
            <Th>Type</Th>
            <Th>Severity</Th>
            <Th>Status</Th>
            <th scope="col" className="px-4 py-3 text-right">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {incidents.map((incident) => (
            <tr key={incident.id} className="hover:bg-slate-50">
              <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-900">
                {formatDate(incident.incidentDate)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-900">
                {incident.workerName}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
                {incident.employerName}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
                {INCIDENT_TYPE_LABELS[incident.incidentType]}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm">
                <SeverityBadge severity={incident.severity} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm">
                <StatusBadge status={incident.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                <IncidentRowActions
                  incidentId={incident.id}
                  workerName={incident.workerName}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      scope="col"
      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700"
    >
      {children}
    </th>
  );
}
