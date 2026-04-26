export default function IncidentsLoading() {
  return (
    <div className="space-y-4" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading incidents…</span>
      <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />
      <div className="h-64 animate-pulse rounded-lg bg-slate-100" />
    </div>
  );
}
