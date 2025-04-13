"use client";

import { useState } from "react";
import Paiement from "@/models/Paiement";

interface AddPaiementFormProps {
  contratId: number;
  onPaiementAdded: () => void;
  onCancel?: () => void;
}

export default function AddPaiementForm({
  contratId,
  onPaiementAdded,
  onCancel,
}: AddPaiementFormProps) {
  const [datePaiement, setDatePaiement] = useState("");
  const [montant, setMontant] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPaiement: Partial<Paiement> = {
      datePaiement: new Date(datePaiement),
      montant: parseFloat(montant),
      contrat: { id: contratId },
    };

    try {
      const res = await fetch("http://localhost:9008/api/paiements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPaiement),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout du paiement");

      onPaiementAdded();

      // Réinitialisation des champs
      setDatePaiement("");
      setMontant("");
    } catch (err) {
      console.error("Erreur lors de l'ajout du paiement :", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mt-4 bg-white p-4 rounded-lg shadow-sm ring-1 ring-gray-200"
    >
      <h2 className="text-xl font-semibold">Ajouter un paiement</h2>

      <input
        type="date"
        value={datePaiement}
        onChange={(e) => setDatePaiement(e.target.value)}
        placeholder="Date de paiement"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        required
      />

      <input
        type="number"
        value={montant}
        onChange={(e) => setMontant(e.target.value)}
        placeholder="Montant du paiement"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        required
      />

      <div className="flex gap-2 justify-end pt-2">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Ajouter
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md border border-gray-300"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}