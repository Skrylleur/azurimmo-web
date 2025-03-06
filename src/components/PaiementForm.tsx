"use client";
import { useState } from "react";

export default function PaiementForm() {
    const [montant, setMontant] = useState("");
    const [datePaiement, setDatePaiement] = useState("");

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const data = {
            datePaiement,
            montant: parseFloat(montant),
            contrat: { id: 1 } // Remplace par l'ID correct
        };

        try {
            const response = await fetch("http://localhost:9008/api/paiements", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Erreur ${response.status}: ${response.statusText}`);
            }

            console.log("Paiement ajouté !");
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="number" 
                placeholder="Montant" 
                value={montant} 
                onChange={(e) => setMontant(e.target.value)} 
                required 
            />
            <input 
                type="date" 
                value={datePaiement} 
                onChange={(e) => setDatePaiement(e.target.value)} 
                required 
            />
            <button type="submit">Ajouter</button>
        </form>
    );
}
