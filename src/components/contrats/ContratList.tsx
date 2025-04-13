"use client";

import Contrat from "@/models/Contrat";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EditContratForm from "./EditContratForm";

export default function ContratList({ contrats }: { contrats: Contrat[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [contratList, setContratList] = useState<Contrat[]>(contrats ?? []);

  useEffect(() => {
    if (Array.isArray(contrats)) {
      setContratList(contrats);
    }
  }, [contrats]);

  const handleUpdate = (updated: Contrat) => {
    setContratList((prev) =>
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
        {contratList.length === 0 ? (
          <p className="text-center text-gray-400 italic">Aucun contrat enregistré pour l’instant.</p>
        ) : (
          contratList.map((contrat) => (
            <div
              key={contrat.id}
              className="bg-white border border-gray-200 rounded-lg shadow p-4 hover:bg-gray-100 transition"
            >
              {editingId === contrat.id ? (
                <EditContratForm
                  contrat={contrat}
                  onCancel={handleCancel}
                  onUpdate={handleUpdate}
                />
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => router.push(`/contrats/${contrat.id}`)}
                >
                  <div className="text-gray-800">
                    <span className="font-medium text-black">
                    Contrat du {new Date(contrat.dateEntree).toLocaleDateString("fr-FR")} – {new Date(contrat.dateSortie).toLocaleDateString("fr-FR")}
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