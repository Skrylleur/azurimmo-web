"use client";

import { useState } from "react";
import Contrat from "@/models/Contrat";

type AppartementMinimal = {
    id: number;
  };

interface AddContratFormProps {
  appartementId: number;
  onContratAdded: () => void;
  onCancel?: () => void;
}

export default function AddContratForm({
  appartementId,
  onContratAdded,
  onCancel,
}: AddContratFormProps) {
  const [dateEntree, setDateEntree] = useState("");
  const [dateSortie, setDateSortie] = useState("");
  const [montantLoyer, setMontantLoyer] = useState("");
  const [montantCharges, setMontantCharges] = useState("");
  const [statut, setStatut] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newContrat: Partial<Contrat> = {
      dateEntree: new Date(dateEntree),
      dateSortie: new Date(dateSortie),
      montantLoyer: parseInt(montantLoyer),
      montantCharges: parseInt(montantCharges),
      statut,
      appartement: { id: appartementId } as AppartementMinimal,
    };

    try {
      const res = await fetch("http://localhost:9008/api/contrats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContrat),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout du contrat");

      onContratAdded();
      setDateEntree("");
      setDateSortie("");
      setMontantCharges("");
      setMontantLoyer("");
      setStatut("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mt-4 bg-white p-4 rounded-lg shadow-sm ring-1 ring-gray-200"
    >
      <h2 className="text-xl font-semibold">Ajouter un contrat</h2>

      <input
        type="date"
        value={dateEntree}
        onChange={(e) => setDateEntree(e.target.value)}
        placeholder="Date d'entrée"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        required
      />

      <input
        type="date"
        step="Date de sortie"
        value={dateSortie}
        onChange={(e) => setDateSortie(e.target.value)}
        placeholder="Date de sortie"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        required
      />

      <input
        type="number"
        value={montantLoyer}
        onChange={(e) => setMontantLoyer(e.target.value)}
        placeholder="Montant loyer"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        required
      />

      <input
        type="number"
        value={montantCharges}
        onChange={(e) => setMontantCharges(e.target.value)}
        placeholder="Montant charges"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        required
      />

      <input
        type="text"
        value={statut}
        onChange={(e) => setStatut(e.target.value)}
        placeholder="Statut"
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