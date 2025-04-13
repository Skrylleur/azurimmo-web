"use client";

import Intervention from "@/models/Intervention";
import Link from "next/link";
import { useEffect, useState } from "react";
import EditInterventionForm from "./EditInterventionForm";
import { useRouter } from "next/navigation";

export default function InterventionList({ interventions }: { interventions: Intervention[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [interventionList, setInterventionList] = useState<Intervention[]>(interventions ?? []);

  useEffect(() => {
    if (Array.isArray(interventions)) {
      setInterventionList(interventions);
    }
  }, [interventions]);

  const handleUpdate = (updated: Intervention) => {
    setInterventionList((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <>
      <Link href="/" className="inline-block text-sm text-gray-500 hover:text-gray-700 underline transition">
        Retour à l&apos;accueil
      </Link>

      <div className="grid gap-4 mt-6">
        {interventionList.length === 0 ? (
          <p className="text-center text-gray-400 italic">Aucune intervention enregistrée pour l’instant.</p>
        ) : (
          interventionList.map((intervention) => (
            <div
              key={intervention.id}
              className="bg-white border border-gray-200 rounded-lg shadow p-4 hover:bg-gray-100 transition"
            >
              {editingId === intervention.id ? (
                <EditInterventionForm
                  intervention={intervention}
                  onCancel={handleCancel}
                  onUpdate={handleUpdate}
                />
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => router.push(`/interventions/${intervention.id}`)}
                >
                  <div className="text-gray-800">
                    <span className="font-medium text-black">
                      Intervention du {new Date(intervention.dateInter).toLocaleDateString("fr-FR")} – {intervention.typeInter}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}