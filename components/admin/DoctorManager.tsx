"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2 } from "lucide-react";
import type { Doctor } from "@/lib/repository";

export default function DoctorManager({
  initialDoctors,
}: {
  initialDoctors: Doctor[];
}) {
  const router = useRouter();
  const [doctors, setDoctors] = useState(initialDoctors);
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name || !specialty) {
      setError("Nom et spécialité sont requis.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/admin/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, specialty, bio }),
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Une erreur est survenue.");
      return;
    }

    const data = await res.json();
    setDoctors((prev) => [...prev, data.doctor]);
    setName("");
    setSpecialty("");
    setBio("");
    router.refresh();
  }

  async function handleToggleActive(doctor: Doctor) {
    const nextActive = !doctor.active;
    setDoctors((prev) =>
      prev.map((d) =>
        d.id === doctor.id ? { ...d, active: nextActive } : d,
      ),
    );
    await fetch(`/api/admin/doctors/${doctor.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: nextActive }),
    });
    router.refresh();
  }

  async function handleDelete(doctor: Doctor) {
    if (!confirm(`Supprimer ${doctor.name} ?`)) return;
    setDoctors((prev) => prev.filter((d) => d.id !== doctor.id));
    await fetch(`/api/admin/doctors/${doctor.id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-3 rounded-2xl bg-bg-tint-soft p-5 sm:flex-row sm:items-end sm:flex-wrap"
      >
        <div className="flex flex-1 min-w-[160px] flex-col gap-1">
          <label className="text-xs font-medium text-black">Nom</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Dr. Jean Dupont"
            className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-brand-blue"
          />
        </div>
        <div className="flex flex-1 min-w-[160px] flex-col gap-1">
          <label className="text-xs font-medium text-black">Spécialité</label>
          <input
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            placeholder="Cardiologie"
            className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-brand-blue"
          />
        </div>
        <div className="flex flex-1 min-w-[160px] flex-col gap-1">
          <label className="text-xs font-medium text-black">
            Bio (optionnel)
          </label>
          <input
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Courte description"
            className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-brand-blue"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-1.5 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-blue-light disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Plus className="size-4" />
          )}
          Ajouter
        </button>
      </form>
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex flex-col gap-2">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="flex flex-col gap-2 rounded-xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-black">
                {doctor.name}{" "}
                <span className="text-sm font-normal text-text-muted">
                  — {doctor.specialty}
                </span>
              </p>
              {doctor.bio && (
                <p className="text-xs text-text-muted">{doctor.bio}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleToggleActive(doctor)}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  doctor.active
                    ? "bg-green-100 text-green-700"
                    : "bg-black/5 text-text-muted"
                }`}
              >
                {doctor.active ? "Actif" : "Inactif"}
              </button>
              <button
                type="button"
                onClick={() => handleDelete(doctor)}
                aria-label={`Supprimer ${doctor.name}`}
                className="flex size-8 items-center justify-center rounded-lg border border-red-200 text-red-500 transition-colors hover:bg-red-50"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
