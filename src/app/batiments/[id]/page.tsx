"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Batiment from "@/models/Batiment";
import Appartement from "@/models/Appartement";
import EditBatimentForm from "@/components/batiments/EditBatimentForm";
import AddAppartementForm from "@/components/appartements/AddAppartementForm";
import { useRouter } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";

export default function BatimentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [batiment, setBatiment] = useState<Batiment | null>(null);
  const [appartements, setAppartements] = useState<Appartement[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchAppartements = async () => {
    if (!batiment) return;
    const res = await fetch(`http://localhost:9008/api/appartements/batiment/${batiment.id}`);
    const data = await res.json();
    setAppartements(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const batimentRes = await fetch(`http://localhost:9008/api/batiments/${params.id}`);
        const batimentData = await batimentRes.json();
        setBatiment(batimentData);

        const appartRes = await fetch(`http://localhost:9008/api/appartements/batiment/${params.id}`);
        const appartData = await appartRes.json();
        setAppartements(appartData);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchData();
  }, [params.id]);

  const handleUpdate = (updated: Batiment) => {
    setBatiment(updated);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!batiment) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 text-gray-800">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Détail du bâtiment</h1>

        {!isEditing ? (
          <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200 space-y-2">
            <p><span className="font-semibold">Adresse :</span> {batiment.adresse}</p>
            <p><span className="font-semibold">Ville :</span> {batiment.ville}</p>
            <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Modifier ce bâtiment
            </button>

            <DeleteButton
              entity="batiments"
              id={batiment.id}
              redirectTo="/batiments"
              label="Supprimer ce bâtiment"
            />
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200">
            <EditBatimentForm
              batiment={batiment}
              onCancel={handleCancel}
              onUpdate={handleUpdate}
            />
          </div>
        )}

        <button
        onClick={() => router.back()}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm transition"
        >
        Retour
        </button>

        {/* 🔽 Liste des appartements */}
        <div>
          <div className="flex justify-between items-center mt-8 mb-4">
            <h2 className="text-xl font-semibold">Appartements rattachés</h2>
            {!showForm && (
                <button
                onClick={() => setShowForm(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                >
                Ajouter un appartement
                </button>
            )}
          </div>

          {/* 🔽 Formulaire affiché dynamiquement */}
          {showForm && (
            <div className="bg-white p-4 mt-6 rounded-xl shadow-sm ring-1 ring-gray-200">
              <AddAppartementForm
                batimentId={batiment.id}
                onAppartAdded={() => {
                  fetchAppartements();
                  setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
              />
            </div>
          )}

          {appartements.length === 0 ? (
            <p className="text-gray-500">Aucun appartement trouvé pour ce bâtiment.</p>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {appartements.map((appart) => (
              <div
                key={appart.id}
                onClick={() => router.push(`/appartements/${appart.id}`)}
                className="cursor-pointer bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:bg-gray-100 transition"
              >
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  Appartement n°{appart.numero}
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium">Surface :</span> {appart.surface} m²</p>
                  <p><span className="font-medium">Pièces :</span> {appart.nbPieces}</p>
                  <p><span className="font-medium">Description :</span> {appart.description}</p>
                </div>
              </div>
            ))}
          </div>          
        )}
        </div>
      </div>
    </div>
  );
}