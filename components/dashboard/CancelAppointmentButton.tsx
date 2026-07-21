"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, X } from "lucide-react";

export default function CancelAppointmentButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleCancel() {
    if (!confirm("Annuler ce rendez-vous ?")) return;
    setLoading(true);
    const res = await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "cancelled" }),
    });
    setLoading(false);
    if (res.ok) {
      router.refresh();
    } else {
      alert("Impossible d'annuler ce rendez-vous.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleCancel}
      disabled={loading}
      className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <X className="size-3.5" />
      )}
      Annuler
    </button>
  );
}
