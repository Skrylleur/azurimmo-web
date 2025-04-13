"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Garant from "@/models/Garant";
import EditGarantForm from "@/components/garants/EditGarantForm";

export default function GarantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [garant, setGarant] = useState<Garant | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:9008/api/garants/${params.id}`);
        if (!res.ok) throw new Error("Erreur de chargement du garant");

        const data = await res.json();
        setGarant(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (params.id) fetchData();
  }, [params.id]);

  if (!garant) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 text-gray-800">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Détail du garant</h1>

        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-700 text-sm underline"
        >
          Retour
        </button>

        {!isEditing ? (
          <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200 space-y-2">
            <p><strong>Nom :</strong> {garant.nom}</p>
            <p><strong>Prénom :</strong> {garant.prenom}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Modifier ce garant
            </button>
          </div>
        ) : (
          <EditGarantForm
            garant={garant}
            onCancel={() => setIsEditing(false)}
            onUpdate={(updated) => {
              setGarant(updated);
              setIsEditing(false);
            }}
          />
        )}
      </div>
    </div>
  );
}