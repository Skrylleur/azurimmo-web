"use client";
import { useEffect, useState } from "react";
import Batiment from "@/models/Batiment";
import BatimentForm from "./BatimentForm";
import BatimentComponent from "./BatimentComponent";
import Link from "next/link";

export default function AddBatimentComponent() {
    const [batiments, setBatiments] = useState<Batiment[]>([]);

    const fetchBatiments = async () => {
        console.log("Rechargement de la liste...");
        const res = await fetch("http://localhost:9008/api/batiments");
        const data = await res.json();
        console.log("Liste récupérée :", data);
        setBatiments(data);
      };
    
    useEffect(() => {
        fetchBatiments();
    }, []);

    const handleBatimentAjoute = () => {
        fetchBatiments(); // ⬅️ recharge toute la liste
    };

    return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 px-4 py-8">
    <div className="max-w-2xl mx-auto space-y-8">

        <h1 className="text-3xl font-semibold text-center text-gray-900">Gestion des bâtiments</h1>

        <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200">
        <BatimentForm onBatimentAdded={handleBatimentAjoute} />
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
        {batiments.length === 0 ? (
            <p className="text-center text-gray-500">Aucun bâtiment enregistré.</p>
        ) : (
            <BatimentComponent batiments={batiments} />
        )}
        </div>

    </div>
    </div>
    );
}