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
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 items-center mb-6">
        <input
            type="number"
            placeholder="Montant"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            required
            className="px-4 py-2 border rounded-md w-full sm:w-auto text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
            type="date"
            value={datePaiement}
            onChange={(e) => setDatePaiement(e.target.value)}
            required
            className="px-4 py-2 border rounded-md w-full sm:w-auto text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
        >
        Ajouter
        </button>        
        </form>
    );
}