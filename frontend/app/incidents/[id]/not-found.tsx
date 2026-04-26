import Link from "next/link";

export default function IncidentNotFound() {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center">
      <h2 className="text-xl font-semibold">Incident not found</h2>
      <p className="mt-2 text-sm text-slate-600">
        The incident you&apos;re looking for doesn&apos;t exist or may have
        been deleted.
      </p>
      <Link
        href="/incidents"
        className="mt-4 inline-block rounded text-blue-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        ← Back to incidents list
      </Link>
    </div>
  );
}
