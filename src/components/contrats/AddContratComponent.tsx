"use client";
import { useEffect, useState } from "react";
import Contrat from "@/models/Contrat";
import ContratComponent from "./ContratComponent";
import ContratForm from "./ContratForm";

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
        fetchContrats(); // ⬅️ recharge toute la liste
    };

    return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 px-4 py-8">
    <div className="max-w-2xl mx-auto space-y-8">

        <h1 className="text-3xl font-semibold text-center text-gray-900">Gestion des contrats</h1>

        <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200">
        <ContratForm onContratAdded={handleContratAjoute} />
        </div>

        <div className="space-y-4">
        {contrats.length === 0 ? (
            <p className="text-center text-gray-500">Aucun contrat enregistré.</p>
        ) : (
            <ContratComponent contrats={contrats} />
        )}
        </div>

    </div>
    </div>
    );
}