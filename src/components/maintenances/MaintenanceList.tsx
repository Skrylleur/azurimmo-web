"use client";

import { useRouter } from "next/navigation";
import Maintenance from "@/models/Maintenance";

export default function MaintenanceList({ maintenances }: { maintenances: Maintenance[] }) {
  const router = useRouter();

  if (maintenances.length === 0) {
    return <p className="text-center text-gray-400 italic">Aucune maintenance prévue.</p>;
  }

  return (
    <div className="space-y-4">
      {maintenances.map((m) => (
        <div
          key={m.id}
          className="p-4 bg-white shadow rounded-lg border hover:bg-gray-50 cursor-pointer"
          onClick={() => router.push(`/maintenances/${m.id}`)}
        >
          <p><strong>{m.typeInter}</strong> – {new Date(m.dateInter).toLocaleDateString("fr-FR")}</p>
          <p className="text-sm text-gray-500">Par : {m.nomIntervenant} – Fréquence : {m.frequence}</p>
        </div>
      ))}
    </div>
  );
}