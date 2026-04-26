"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { incidentSchema, type IncidentFormValues } from "@/lib/schemas";
import { incidentsApi } from "@/lib/api";
import {
  INCIDENT_TYPES,
  SEVERITIES,
  STATUSES,
  INCIDENT_TYPE_LABELS,
  STATUS_LABELS,
} from "@/lib/types";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Textarea } from "@/components/atoms/Textarea";
import { Select } from "@/components/atoms/Select";
import { FormField } from "@/components/molecules/FormField";

type Props = {
  initialValues?: IncidentFormValues;
  incidentId?: number;
};

export function IncidentForm({ initialValues, incidentId }: Props) {
  const router = useRouter();
  const isEdit = incidentId !== undefined;
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<IncidentFormValues>({
    resolver: zodResolver(incidentSchema),
    defaultValues:
      initialValues ?? {
        workerName: "",
        employerName: "",
        incidentType: "" as IncidentFormValues["incidentType"],
        severity: "" as IncidentFormValues["severity"],
        incidentDate: "",
        description: "",
        status: "Open",
      },
  });

  const onValid: SubmitHandler<IncidentFormValues> = async (values) => {
    setSubmitError(null);
    try {
      const payload = {
        ...values,
        incidentDate: new Date(values.incidentDate).toISOString(),
      };
      if (isEdit) {
        await incidentsApi.update(incidentId!, payload);
      } else {
        await incidentsApi.create(payload);
      }
      router.push("/incidents");
      router.refresh();
    } catch (e) {
      setSubmitError(
        e instanceof Error
          ? e.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  const onInvalid = (errs: FieldErrors<IncidentFormValues>) => {
    const firstErrorName = Object.keys(errs)[0] as keyof IncidentFormValues | undefined;
    if (firstErrorName) setFocus(firstErrorName);
  };

  return (
    <form
      onSubmit={handleSubmit(onValid, onInvalid)}
      noValidate
      aria-labelledby="form-heading"
      className="max-w-2xl space-y-5"
    >
      <h2 id="form-heading" className="text-2xl font-semibold tracking-tight">
        {isEdit ? "Edit incident" : "Report new incident"}
      </h2>

      <div aria-live="polite" aria-atomic="true">
        {submitError && (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-900"
          >
            {submitError}
          </div>
        )}
      </div>

      <FormField
        id="workerName"
        label="Worker name"
        required
        error={errors.workerName?.message}
      >
        <Input {...register("workerName")} />
      </FormField>

      <FormField
        id="employerName"
        label="Employer"
        required
        error={errors.employerName?.message}
      >
        <Input {...register("employerName")} />
      </FormField>

      <FormField
        id="incidentDate"
        label="Incident date"
        required
        hint="When the incident occurred."
        error={errors.incidentDate?.message}
      >
        <Input type="date" {...register("incidentDate")} />
      </FormField>

      <FormField
        id="incidentType"
        label="Incident type"
        required
        error={errors.incidentType?.message}
      >
        <Select {...register("incidentType")}>
          <option value="" disabled>
            Select a type
          </option>
          {INCIDENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {INCIDENT_TYPE_LABELS[t]}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField
        id="severity"
        label="Severity"
        required
        error={errors.severity?.message}
      >
        <Select {...register("severity")}>
          <option value="" disabled>
            Select a severity
          </option>
          {SEVERITIES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </FormField>

      {isEdit && (
        <FormField
          id="status"
          label="Status"
          required
          error={errors.status?.message}
        >
          <Select {...register("status")}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </Select>
        </FormField>
      )}

      <FormField
        id="description"
        label="Description"
        required
        hint="At least 10 characters describing what happened."
        error={errors.description?.message}
      >
        <Textarea rows={4} {...register("description")} />
      </FormField>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving…"
            : isEdit
              ? "Save changes"
              : "Report incident"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/incidents")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
