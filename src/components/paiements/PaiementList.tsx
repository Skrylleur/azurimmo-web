"use client";

import Paiement from "@/models/Paiement";
import { useEffect, useState } from "react";
import EditPaiementForm from "./EditPaiementForm";
import { useRouter } from "next/navigation";

export default function PaiementList({ paiements }: { paiements: Paiement[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [paiementList, setPaiementList] = useState<Paiement[]>(paiements ?? []);

  useEffect(() => {
    if (Array.isArray(paiements)) {
      setPaiementList(paiements);
    }
  }, [paiements]);

  const handleUpdate = (updated: Paiement) => {
    setPaiementList((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <>
      <div className="grid gap-4 mt-6">
        {paiementList.length === 0 ? (
          <p className="text-center text-gray-400 italic">Aucun paiement enregistré pour l’instant.</p>
        ) : (
          paiementList.map((paiement) => (
            <div
              key={paiement.id}
              className="bg-white border border-gray-200 rounded-lg shadow p-4 hover:bg-gray-100 transition"
            >
              {editingId === paiement.id ? (
                <EditPaiementForm
                paiement={paiement}
                  onCancel={handleCancel}
                  onUpdate={handleUpdate}
                />
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => router.push(`/paiements/${paiement.id}`)}
                >
                  <div className="text-gray-800">
                    <span className="font-medium text-black">
                    Paiement du {new Date(paiement.datePaiement).toLocaleDateString("fr-FR")} de {paiement.montant}€
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