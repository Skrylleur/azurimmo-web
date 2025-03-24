"use client";
import { useEffect, useState } from "react";
import Paiement from "@/models/Paiement";
import PaiementForm from "./PaiementForm";
import PaiementComponent from "./PaiementComponent";

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
        fetchPaiements(); // ⬅️ recharge toute la liste
    };

    return (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Gestion des paiements</h2>
      
          <PaiementForm onPaiementAdded={handlePaiementAjoute} />
      
          <h2 className="text-xl font-bold mt-6 mb-4">Paiements</h2>
          <PaiementComponent paiements={paiements} />
        </div>
      );
}