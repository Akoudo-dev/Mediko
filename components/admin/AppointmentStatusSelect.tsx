"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type Status = "pending" | "confirmed" | "cancelled";

export default function AppointmentStatusSelect({
  id,
  status,
}: {
  id: string;
  status: Status;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(status);

  async function handleChange(next: Status) {
    setValue(next);
    setLoading(true);
    const res = await fetch(`/api/admin/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setLoading(false);
    if (res.ok) {
      router.refresh();
    } else {
      setValue(status);
      alert("Impossible de mettre à jour le statut.");
    }
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={value}
        disabled={loading}
        onChange={(e) => handleChange(e.target.value as Status)}
        className="rounded-lg border border-black/10 bg-white px-2 py-1.5 text-xs outline-none focus:border-brand-blue disabled:opacity-50"
      >
        <option value="pending">En attente</option>
        <option value="confirmed">Confirmé</option>
        <option value="cancelled">Annulé</option>
      </select>
      {loading && <Loader2 className="size-3.5 animate-spin text-brand-blue" />}
    </div>
  );
}
