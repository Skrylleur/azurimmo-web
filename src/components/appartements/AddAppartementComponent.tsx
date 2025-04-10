"use client";
import { useEffect, useState } from "react";
import Appartement from "@/models/Appartement";

import AppartementComponent from "./AppartementComponent";
import AppartementForm from "./AppartementForm";

export default function AddAppartementComponent() {
    const [appartements, setAppartements] = useState<Appartement[]>([]);

    const fetchAppartements = async () => {
        console.log("Rechargement de la liste...");
        const res = await fetch("http://localhost:9008/api/appartements");
        const data = await res.json();
        console.log("Liste récupérée :", data);
        setAppartements(data);
      };
    
    useEffect(() => {
        fetchAppartements();
    }, []);

    const handleAppartementAjoute = () => {
        fetchAppartements(); // ⬅️ recharge toute la liste
    };

    return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 px-4 py-8">
    <div className="max-w-2xl mx-auto space-y-8">

        <h1 className="text-3xl font-semibold text-center text-gray-900">Gestion des appartements</h1>

        <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200">
        <AppartementForm onAppartementAdded={handleAppartementAjoute} />
        </div>

        <div className="space-y-4">
        {appartements.length === 0 ? (
            <p className="text-center text-gray-500">Aucun appartement enregistré.</p>
        ) : (
            <AppartementComponent appartements={appartements} />
        )}
        </div>

    </div>
    </div>
    );
}