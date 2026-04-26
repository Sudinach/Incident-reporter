import type { IncidentStatus } from "@/lib/types";
import { STATUS_LABELS } from "@/lib/types";

const styles: Record<IncidentStatus, string> = {
    Open: "bg-blue-100 text-blue-900 ring-blue-700/30",
    UnderReview: "bg-yellow-100 text-yellow-900 ring-yellow-700/30",
    Closed: "bg-slate-200 text-slate-800 ring-slate-600/30",
};

export function StatusBadge({ status }: { status: IncidentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${styles[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}