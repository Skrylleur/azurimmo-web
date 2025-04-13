"use client";
import { useEffect, useState } from "react";
import Paiement from "@/models/Paiement";
import PaiementForm from "./InterventionForm";
import PaiementList from "./PaiementList";

export default function AddPaiementComponent() {

  const [paiements, setPaiements] = useState<Paiement[]>([]);

  const fetchPaiements = async () => {
    console.log("Rechargement de la liste...");
    const res = await fetch("http://localhost:9008/api/paiements");
    const data = await res.json();
    console.log("Liste récupérée :", data);
    setPaiements(data);
  };

  useEffect(() => {
    fetchPaiements();
  }, []);

  const handlePaiementAjoute = () => {
    fetchPaiements();
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-semibold text-center text-gray-900">
          Gestion des paiements
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200">
          <PaiementForm onPaiementAdded={handlePaiementAjoute} />
        </div>

        <div className="space-y-4">
          {paiements.length === 0 ? (
            <p className="text-center text-gray-500">
              Aucun paiement enregistré.
            </p>
          ) : (
            <PaiementList paiements={paiements} />
          )}
        </div>
      </div>
    </div>
  );
}