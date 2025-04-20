"use client";
import { useEffect, useState } from "react";
import Intervention from "@/models/Intervention";
import InterventionComponent from "./InterventionList";
import InterventionForm from "@/components/interventions/InterventionForm";
import Link from "next/link";

export default function AddInterventionComponent() {

  const [interventions, setInterventions] = useState<Intervention[]>([]);

  const fetchInterventions = async () => {
    console.log("Rechargement de la liste...");
    const res = await fetch("http://localhost:9008/api/interventions");
    const data = await res.json();
    console.log("Liste récupérée :", data);
    setInterventions(data);
  };

  useEffect(() => {
    fetchInterventions();
  }, []);

  const handleInterventionAjoute = () => {
    fetchInterventions();
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-semibold text-center text-gray-900">
          Gestion des interventions
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200">
          <InterventionForm onInterventionAdded={handleInterventionAjoute} />
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
          {interventions.length === 0 ? (
            <p className="text-center text-gray-500">
              Aucune intervention enregistrée.
            </p>
          ) : (
            <InterventionComponent interventions={interventions} />
          )}
        </div>
      </div>
    </div>
  );
}