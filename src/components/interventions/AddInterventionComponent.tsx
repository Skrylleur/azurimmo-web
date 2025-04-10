"use client";
import { useEffect, useState } from "react";
import Intervention from "@/models/Intervention";
import InterventionComponent from "./InterventionComponent";
import InterventionForm from "./InterventionForm";

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
        fetchInterventions(); // ⬅️ recharge toute la liste
    };

    return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 px-4 py-8">
    <div className="max-w-2xl mx-auto space-y-8">

        <h1 className="text-3xl font-semibold text-center text-gray-900">Gestion des interventions</h1>

        <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200">
        <InterventionForm onInterventionAdded={handleInterventionAjoute} />
        </div>

        <div className="space-y-4">
        {interventions.length === 0 ? (
            <p className="text-center text-gray-500">Aucun intervention enregistré.</p>
        ) : (
            <InterventionComponent interventions={interventions} />
        )}
        </div>

    </div>
    </div>
    );
}