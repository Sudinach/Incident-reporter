import type { Incident, IncidentInput } from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5044";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },

    cache: "no-store",
  });

  if (!res.ok) {
    let message = `${res.status} ${res.statusText}`;
    try {
      const body = (await res.json()) as { title?: string; errors?: unknown };
      if (body.title) message = body.title;
      if (body.errors) message = JSON.stringify(body.errors);
    } catch {
      // body wasn't JSON; keep default message
    }
    throw new ApiError(res.status, message);
  }

  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
}

export const incidentsApi = {
  list: () => request<Incident[]>("/api/incidents"),
  get: (id: number) => request<Incident>(`/api/incidents/${id}`),
  create: (input: IncidentInput) =>
    request<Incident>("/api/incidents", {
      method: "POST",
      body: JSON.stringify(input),
    }),
  update: (id: number, input: IncidentInput) =>
    request<void>(`/api/incidents/${id}`, {
      method: "PUT",
      body: JSON.stringify(input),
    }),
  remove: (id: number) =>
    request<void>(`/api/incidents/${id}`, {
      method: "DELETE",
    }),
};