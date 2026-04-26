"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { incidentsApi } from "@/lib/api";
import { Button } from "@/components/atoms/Button";

type Props = {
  incidentId: number;
  workerName: string;
};

export function IncidentRowActions({ incidentId, workerName }: Props) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openDialog = () => {
    setError(null);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const onConfirm = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await incidentsApi.remove(incidentId);
      closeDialog();
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="inline-flex items-center gap-4">
        <Link
          href={`/incidents/${incidentId}/edit`}
          className="rounded font-medium text-blue-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Edit
          <span className="sr-only"> incident reported by {workerName}</span>
        </Link>
        <button
          type="button"
          onClick={openDialog}
          className="rounded font-medium text-red-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          Delete
          <span className="sr-only"> incident reported by {workerName}</span>
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={`delete-title-${incidentId}`}
        aria-describedby={`delete-desc-${incidentId}`}
        className="rounded-lg border border-slate-200 bg-white p-0 shadow-xl backdrop:bg-slate-900/50"
      >
        <div className="w-[28rem] max-w-[90vw] p-6">
          <h2
            id={`delete-title-${incidentId}`}
            className="text-lg font-semibold text-slate-900"
          >
            Delete incident?
          </h2>
          <p
            id={`delete-desc-${incidentId}`}
            className="mt-2 text-sm text-slate-700"
          >
            Permanently delete the incident reported by{" "}
            <span className="font-medium">{workerName}</span>? This cannot be
            undone.
          </p>

          {error && (
            <div
              role="alert"
              className="mt-3 rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-900"
            >
              {error}
            </div>
          )}

          <div className="mt-5 flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={closeDialog}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}
