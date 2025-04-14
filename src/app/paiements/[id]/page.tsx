"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Paiement from "@/models/Paiement";
import EditPaiementForm from "@/components/paiements/EditPaiementForm";
import DeleteButton from "@/components/DeleteButton";

export default function PaiementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [paiement, setPaiement] = useState<Paiement | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:9008/api/paiements/${params.id}`);
        if (!res.ok) throw new Error("Erreur de chargement du paiement");

        const data = await res.json();
        setPaiement(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (params.id) fetchData();
  }, [params.id]);

  if (!paiement) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 text-gray-800">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Détail du paiement</h1>

        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-700 text-sm underline"
        >
          Retour
        </button>

        {!isEditing ? (
          <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200 space-y-2">
            <p><strong>Date du paiement :</strong> {new Date(paiement.datePaiement).toLocaleDateString("fr-FR")}</p>
            <p><strong>Montant :</strong> {paiement.montant}</p>
            <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Modifier ce paiement
            </button>

            <DeleteButton
              entity="paiements"
              id={paiement.id}
              redirectTo="/paiements"
              label="Supprimer ce paiement"
            />
            </div>
          </div>
        ) : (
          <EditPaiementForm
            paiement={paiement}
            onCancel={() => setIsEditing(false)}
            onUpdate={(updated) => {
              setPaiement(updated);
              setIsEditing(false);
            }}
          />
        )}
      </div>
    </div>
  );
}