"use client";

import { useState } from "react";
import Contrat from "@/models/Contrat";

type EditContratFormProps = {
  contrat: Contrat;
  onCancel: () => void;
  onUpdate: (updatedContrat: Contrat) => void;
};

export default function EditContratForm({
  contrat,
  onCancel,
  onUpdate,
}: EditContratFormProps) {
  const [dateEntree, setDateEntree] = useState(
    contrat.dateEntree ? new Date(contrat.dateEntree).toISOString().slice(0, 10) : ""
  );
  const [dateSortie, setDateSortie] = useState(
    contrat.dateSortie ? new Date(contrat.dateSortie).toISOString().slice(0, 10) : ""
  );
  const [montantLoyer, setMontantLoyer] = useState(contrat.montantLoyer?.toString() ?? "");
  const [montantCharges, setMontantCharges] = useState(contrat.montantCharges?.toString() ?? "");
  const [statut, setStatut] = useState(contrat.statut ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      dateEntree: new Date(dateEntree),
      dateSortie: new Date(dateSortie),
      montantLoyer: parseFloat(montantLoyer),
      montantCharges: parseFloat(montantCharges),
      statut,
    };

    try {
      const response = await fetch(`http://localhost:9008/api/contrats/${contrat.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour du contrat");

      const updated = await response.json();
      onUpdate(updated);
    } catch (err) {
      console.error("Erreur de mise à jour :", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200 space-y-4 mt-4"
    >
      <h2 className="text-lg font-semibold text-gray-900">Modifier le contrat</h2>

      <div className="grid gap-4">
        <input
          type="date"
          value={dateEntree}
          onChange={(e) => setDateEntree(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />

        <input
          type="date"
          value={dateSortie}
          onChange={(e) => setDateSortie(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />

        <input
          type="number"
          value={montantLoyer}
          onChange={(e) => setMontantLoyer(e.target.value)}
          required
          placeholder="Montant loyer"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />

        <input
          type="number"
          value={montantCharges}
          onChange={(e) => setMontantCharges(e.target.value)}
          required
          placeholder="Montant charges"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />

        <input
          type="text"
          value={statut}
          onChange={(e) => setStatut(e.target.value)}
          required
          placeholder="Statut"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Valider
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}