import type { Severity } from "@/lib/types";

const styles: Record<Severity, string> = {
    Low: "bg-emarald-100 text-emarald-900 ring-emarald-600/30",
    Medium: "bg-amber-100 text-amber-900 ring-amber-700/30",
    High: "bg-orange-100 text-orange-900 ring-orange-700/30",
    Critical: "bg-red-100 text-red-900 ring-red-700/30",
};

export function SeverityBadge({ severity }: {severity: Severity }) {
    return (
        <span
        className={`inline-flex items-center rounden-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${styles[severity]}`}
        >
        {severity}
        </span>
    );
}