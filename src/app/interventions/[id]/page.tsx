"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Intervention from "@/models/Intervention";
import EditInterventionForm from "@/components/interventions/EditInterventionForm";
import DeleteButton from "@/components/DeleteButton";

export default function InterventionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [intervention, setIntervention] = useState<Intervention | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:9008/api/interventions/${params.id}`);
        if (!res.ok) throw new Error("Erreur de chargement de l'intervention");

        const data = await res.json();
        setIntervention(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (params.id) fetchData();
  }, [params.id]);

  if (!intervention) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 text-gray-800">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Détail de l&apos;intervention</h1>

        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-700 text-sm underline"
        >
          Retour
        </button>

        {!isEditing ? (
          <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200 space-y-2">
            <p><strong>Description :</strong> {intervention.description}</p>
            <p><strong>Type :</strong> {intervention.typeInter}</p>
            <p><strong>Date :</strong> {new Date(intervention.dateInter).toLocaleDateString()}</p>
            <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Modifier cette intervention
            </button>

            <DeleteButton
              entity="interventions"
              id={intervention.id}
              redirectTo="/interventions"
              label="Supprimer cette intervention"
            />
            </div>
          </div>
        ) : (
          <EditInterventionForm
            intervention={intervention}
            onCancel={() => setIsEditing(false)}
            onUpdate={(updated) => {
              setIntervention(updated);
              setIsEditing(false);
            }}
          />
        )}
      </div>
    </div>
  );
}