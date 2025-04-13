"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Appartement from "@/models/Appartement";
import Intervention from "@/models/Intervention";
import Contrat from "@/models/Contrat";
import EditAppartementForm from "@/components/appartements/EditAppartementForm";
import AddInterventionForm from "@/components/interventions/AddInterventionForm";
import Link from "next/link";
import AddContratForm from "@/components/contrats/AddContratForm";

export default function AppartementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [appartement, setAppartement] = useState<Appartement | null>(null);
  const [contrats, setContrats] = useState<Contrat[]>([]);
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"contrat" | "intervention">("contrat");

  const fetchContrats = async () => {
    const res = await fetch(`http://localhost:9008/api/contrats/appartement/${params.id}`);
    const data = await res.json();
    setContrats(data);
  };

  const fetchInterventions = async () => {
    const res = await fetch(`http://localhost:9008/api/interventions/appartement/${params.id}`);
    const data = await res.json();
    setInterventions(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:9008/api/appartements/${params.id}`);
      const data = await res.json();
      setAppartement(data);
    };

    fetchData();
    fetchContrats();
    fetchInterventions();
  }, [params.id]);

  const handleUpdate = (updated: Appartement) => {
    setAppartement(updated);
    setIsEditing(false);
  };

  if (!appartement) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 text-gray-800">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Détail de l&apos;appartement</h1>
          <button
            onClick={() => router.back()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm"
          >
            Retour
          </button>
        </div>

        {!isEditing ? (
          <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200 space-y-2">
            <p><strong>Numéro :</strong> {appartement.numero}</p>
            <p><strong>Surface :</strong> {appartement.surface}</p>
            <p><strong>Pièces :</strong> {appartement.nbPieces}</p>
            <p><strong>Description :</strong> {appartement.description}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Modifier cet appartement
            </button>
          </div>
        ) : (
          <EditAppartementForm
            appartement={appartement}
            onCancel={() => setIsEditing(false)}
            onUpdate={handleUpdate}
          />
        )}

        <div className="flex gap-4 mt-6">
          <button
            className={`px-4 py-2 rounded-md transition ${
              activeTab === "contrat"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("contrat")}
          >
            Contrats
          </button>
          <button
            className={`px-4 py-2 rounded-md transition ${
              activeTab === "intervention"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("intervention")}
          >
            Interventions
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="ml-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Ajouter {activeTab === "contrat" ? "un contrat" : "une intervention"}
          </button>
        </div>

        {showForm && activeTab === "contrat" && appartement?.id !== undefined && (
          <AddContratForm
            appartementId={appartement.id}
            onContratAdded={() => {
              fetchContrats();
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {showForm && activeTab === "intervention" && appartement?.id !== undefined && (
          <AddInterventionForm
            appartementId={appartement.id}
            onInterventionAdded={() => {
              fetchInterventions();
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {activeTab === "contrat" && (
          <div className="grid gap-4 mt-4">
            {contrats.length === 0 ? (
              <p className="text-gray-500">Aucun contrat pour cet appartement.</p>
            ) : (
              contrats.map((contrat) => (
                <Link
                  key={contrat.id}
                  href={`/contrats/${contrat.id}`}
                  className="bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:bg-gray-50 transition block"
                >
                <div key={contrat.id} className="bg-white p-4 rounded shadow">
                  <p><strong>Entrée :</strong> {new Date(contrat.dateEntree).toLocaleDateString("fr-FR")}</p>
                  <p><strong>Sortie :</strong> {new Date(contrat.dateSortie).toLocaleDateString("fr-FR")}</p>
                  <p><strong>Loyer :</strong> {contrat.montantLoyer} €</p>
                  <p><strong>Charges :</strong> {contrat.montantCharges} €</p>
                  <p><strong>Statut :</strong> {contrat.statut}</p>
                </div>
                </Link>
              ))
            )}
          </div>
        )}

        {activeTab === "intervention" && (
          <div className="grid gap-4 mt-4">
            {interventions.length === 0 ? (
              <p className="text-gray-500">Aucune intervention pour cet appartement.</p>
            ) : (
              interventions.map((inter) => (
                <Link
                  key={inter.id}
                  href={`/interventions/${inter.id}`}
                  className="bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:bg-gray-50 transition block"
                >
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    {inter.description}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Type :</span> {inter.typeInter}</p>
                    <p><span className="font-medium">Date :</span> {new Date(inter.dateInter).toLocaleDateString()}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}