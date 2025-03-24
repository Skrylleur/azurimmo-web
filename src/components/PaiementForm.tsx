"use client"

import { JSX, useState } from "react";

type PaiementFormProps = {
    onPaiementAdded: () => void;
};

export default function PaiementForm({ onPaiementAdded }: PaiementFormProps): JSX.Element {
    const [montant, setMontant] = useState("");
    const [datePaiement, setDatePaiement] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            datePaiement,
            montant: parseFloat(montant),
            contrat: { id: 1 }
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

            const newPaiement = await response.json();
            console.log("Nouveau paiement ajouté :", newPaiement);

            onPaiementAdded();

            setMontant("");
            setDatePaiement("");
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
        }
    };

    // ⬇️ Ce return est essentiel !
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