"use client";
import { useEffect, useState } from "react";
import Garant from "@/models/Garant";
import GarantComponent from "./GarantComponent";
import GarantForm from "./GarantForm";

export default function AddGarantComponent() {
    const [garants, setGarants] = useState<Garant[]>([]);

    const fetchGarants = async () => {
        console.log("Rechargement de la liste...");
        const res = await fetch("http://localhost:9008/api/garants");
        const data = await res.json();
        console.log("Liste récupérée :", data);
        setGarants(data);
      };
    
    useEffect(() => {
        fetchGarants();
    }, []);

    const handleGarantAjoute = () => {
        fetchGarants(); // ⬅️ recharge toute la liste
    };

    return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 px-4 py-8">
    <div className="max-w-2xl mx-auto space-y-8">

        <h1 className="text-3xl font-semibold text-center text-gray-900">Gestion des garants</h1>

        <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200">
        <GarantForm onGarantAdded={handleGarantAjoute} />
        </div>

        <div className="space-y-4">
        {garants.length === 0 ? (
            <p className="text-center text-gray-500">Aucun garant enregistré.</p>
        ) : (
            <GarantComponent garants={garants} />
        )}
        </div>

    </div>
    </div>
    );
}