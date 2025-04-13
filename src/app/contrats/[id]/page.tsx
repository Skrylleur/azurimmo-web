"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Contrat from "@/models/Contrat";
import Garant from "@/models/Garant";
import Paiement from "@/models/Paiement";
import Locataire from "@/models/Locataire";
import AddGarantForm from "@/components/garants/AddGarantForm";
import AddPaiementForm from "@/components/paiements/AddPaiementForm";
import AddLocataireForm from "@/components/locataires/AddLocataireForm";
import Link from "next/link";
import EditContratForm from "@/components/contrats/EditContratForm";
import DeleteButton from "@/components/DeleteButton";

export default function ContratDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [contrat, setContrat] = useState<Contrat | null>(null);
  const [garants, setGarants] = useState<Garant[]>([]);
  const [paiements, setPaiements] = useState<Paiement[]>([]);
  const [locataires, setLocataires] = useState<Locataire[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"garant" | "paiement" | "locataire">("garant");

  const fetchGarants = async () => {
    const res = await fetch(`http://localhost:9008/api/garants/contrat/${params.id}`);
    const data = await res.json();
    setGarants(data);
  };

  const fetchPaiements = async () => {
    const res = await fetch(`http://localhost:9008/api/paiements/contrat/${params.id}`);
    const data = await res.json();
    setPaiements(data);
  };

  const fetchLocataires = async () => {
    const res = await fetch(`http://localhost:9008/api/locataires/contrat/${params.id}`);
    const data = await res.json();
    setLocataires(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:9008/api/contrats/${params.id}`);
      const data = await res.json();
      setContrat(data);
    };

    fetchData();
    fetchGarants();
    fetchPaiements();
    fetchLocataires();
  }, [params.id]);

  const handleUpdate = (updated: Contrat) => {
    setContrat(updated);
    setIsEditing(false);
  };

  if (!contrat) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 text-gray-800">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Détail du contrat</h1>
          <button
            onClick={() => router.back()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm"
          >
            Retour
          </button>
        </div>

        {!isEditing ? (
          <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200 space-y-2">
            <p><strong>Date d&apos;entrée :</strong> {new Date(contrat.dateEntree).toLocaleDateString("fr-FR")}</p>
            <p><strong>Date de sortie :</strong> {new Date(contrat.dateSortie).toLocaleDateString("fr-FR")}</p>
            <p><strong>Montant loyer :</strong> {contrat.montantLoyer}</p>
            <p><strong>Montant charges :</strong> {contrat.montantCharges}</p>
            <p><strong>Statut :</strong> {contrat.statut}</p>
            <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Modifier ce contrat
            </button>

            <DeleteButton
              entity="contrats"
              id={contrat.id}
              redirectTo="/contrats"
              label="Supprimer ce contrat"
            />
          </div>
          </div>
        ) : (
          <EditContratForm
            contrat={contrat}
            onCancel={() => setIsEditing(false)}
            onUpdate={handleUpdate}
          />
        )}

        <div className="flex gap-4 mt-6">
          <button
            className={`px-4 py-2 rounded-md transition ${
              activeTab === "garant"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("garant")}
          >
            Garants
          </button>
          <button
            className={`px-4 py-2 rounded-md transition ${
              activeTab === "paiement"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("paiement")}
          >
            Paiements
          </button>
          <button
            className={`px-4 py-2 rounded-md transition ${
              activeTab === "locataire"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("locataire")}
          >
            Locataires
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="ml-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Ajouter {activeTab === "garant"
            ? "un garant"
            : activeTab === "paiement"
            ? "un paiement"
            : "un locataire"}
          </button>
        </div>

        {showForm && activeTab === "garant" && contrat?.id !== undefined && (
          <AddGarantForm
            contratId={contrat.id}
            onGarantAdded={() => {
              fetchGarants();
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {showForm && activeTab === "paiement" && contrat?.id !== undefined && (
          <AddPaiementForm
            contratId={contrat.id}
            onPaiementAdded={() => {
              fetchPaiements();
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {showForm && activeTab === "locataire" && contrat?.id !== undefined && (
          <AddLocataireForm
            contratId={contrat.id}
            onLocataireAdded={() => {
              fetchLocataires();
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {activeTab === "garant" && (
          <div className="grid gap-4 mt-4">
            {garants.length === 0 ? (
              <p className="text-gray-500">Aucun garant pour ce contrat.</p>
            ) : (
              garants.map((garant) => (
                <Link
                  key={garant.id}
                  href={`/garants/${garant.id}`}
                  className="bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:bg-gray-50 transition block"
                  >
                    <div className="text-lg font-semibold text-gray-900 mb-2">
                    Garant :
                  </div>
                <div key={garant.id} className="bg-white p-4 rounded shadow">
                  <p><strong>Nom :</strong> {garant.nom}</p>
                  <p><strong>Prénom :</strong> {garant.prenom}</p>
                </div>
                </Link>
              ))
            )}
          </div>
        )}

        {activeTab === "paiement" && (
          <div className="grid gap-4 mt-4">
            {paiements.length === 0 ? (
              <p className="text-gray-500">Aucun paiement pour ce contrat.</p>
            ) : (
              paiements.map((paiement) => (
                <Link
                  key={paiement.id}
                  href={`/paiements/${paiement.id}`}
                  className="bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:bg-gray-50 transition block"
                >
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    Paiement du {new Date(paiement.datePaiement).toLocaleDateString("fr-FR")}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Date de paiement :</span> {new Date(paiement.datePaiement).toLocaleDateString()}</p>
                    <p><span className="font-medium">Montant :</span> {paiement.montant}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

        {activeTab === "locataire" && (
          <div className="grid gap-4 mt-4">
            {locataires.length === 0 ? (
              <p className="text-gray-500">Aucun locataire pour ce contrat.</p>
            ) : (
              locataires.map((locataire) => (
                <Link
                key={locataire.id}
                href={`/paiements/${locataire.id}`}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:bg-gray-50 transition block"
              >
                <div key={locataire.id} className="bg-white p-4 rounded shadow">
                  <p><strong>Nom :</strong> {locataire.nom}</p>
                  <p><strong>Prénom :</strong> {locataire.prenom}</p>
                  <p><span className="font-medium">Date de naissance :</span> {new Date(locataire.dateN).toLocaleDateString()}</p>
                  <p><strong>Lieu de naissance :</strong> {locataire.lieuN}</p>
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