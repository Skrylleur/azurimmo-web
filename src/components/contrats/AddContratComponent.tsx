"use client";
import { useEffect, useState } from "react";
import Contrat from "@/models/Contrat";
import ContratList from "@/components/contrats/ContratList";
import ContratForm from "./ContratForm";
import Link from "next/link";

export default function AddContratComponent() {
  const [contrats, setContrats] = useState<Contrat[]>([]);

  const fetchContrats = async () => {
    console.log("Rechargement de la liste...");
    const res = await fetch("http://localhost:9008/api/contrats");
    const data = await res.json();
    console.log("Liste récupérée :", data);
    setContrats(data);
  };

  useEffect(() => {
    fetchContrats();
  }, []);

  const handleContratAjoute = () => {
    fetchContrats(); // Recharge la liste après ajout
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-semibold text-center text-gray-900">
          Gestion des contrats
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200">
          <ContratForm onContratAdded={handleContratAjoute} />
        </div>

        <div className="text-center">
        <Link
          href="/"
          className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm transition"
        >
          Retour à l&apos;accueil
        </Link>      
        </div>

        <div className="space-y-4">
          {contrats.length === 0 ? (
            <p className="text-center text-gray-500">
              Aucun contrat enregistré.
            </p>
          ) : (
            <ContratList contrats={contrats} />
          )}
        </div>
      </div>
    </div>
  );
}