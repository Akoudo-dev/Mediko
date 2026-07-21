const styles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

const labels: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmé",
  cancelled: "Annulé",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] ?? "bg-black/5 text-black"
      }`}
    >
      {labels[status] ?? status}
    </span>
  );
}
