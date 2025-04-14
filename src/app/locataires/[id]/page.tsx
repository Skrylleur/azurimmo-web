"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Locataire from "@/models/Locataire";
import EditLocataireForm from "@/components/locataires/EditLocataireForm";
import DeleteButton from "@/components/DeleteButton";

export default function LocataireDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [locataire, setLocataire] = useState<Locataire | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:9008/api/locataires/${params.id}`);
        if (!res.ok) throw new Error("Erreur de chargement du locataire");

        const data = await res.json();
        setLocataire(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (params.id) fetchData();
  }, [params.id]);

  if (!locataire) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 text-gray-800">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Détail du locataire</h1>

        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-700 text-sm underline"
        >
          Retour
        </button>

        {!isEditing ? (
          <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200 space-y-2">
            <p><strong>Nom :</strong> {locataire.nom}</p>
            <p><strong>Prénom :</strong> {locataire.prenom}</p>
            <p><strong>Date de naissance :</strong> {new Date(locataire.dateN).toLocaleDateString()}</p>
            <p><strong>Lieu de naissance :</strong> {locataire.lieuN}</p>
            <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Modifier ce locataire
            </button>

            <DeleteButton
              entity="locataires"
              id={locataire.id}
              redirectTo="/locataires"
              label="Supprimer ce locataire"
            />
            </div>
          </div>
        ) : (
          <EditLocataireForm
            locataire={locataire}
            onCancel={() => setIsEditing(false)}
            onUpdate={(updated) => {
              setLocataire(updated);
              setIsEditing(false);
            }}
          />
        )}
      </div>
    </div>
  );
}