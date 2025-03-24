"use client";
import { useState } from "react";
import Paiement from "@/models/Paiement";

type EditPaiementFormProps = {
  paiement: Paiement;
  onCancel: () => void;
  onUpdate: (updatedPaiement: Paiement) => void;
};

export default function EditPaiementForm({
  paiement,
  onCancel,
  onUpdate,
}: EditPaiementFormProps) {
  const [montant, setMontant] = useState(paiement.montant.toString());
  const [datePaiement, setDatePaiement] = useState(
    new Date(paiement.datePaiement).toISOString().split("T")[0]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      montant: parseFloat(montant),
      datePaiement,
    };

    try {
      const response = await fetch(`http://localhost:9008/api/paiements/${paiement.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }

      const updated = await response.json();
      onUpdate(updated); // on met à jour la liste
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        type="number"
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
      <button type="submit">Valider</button>
      <button type="button" onClick={onCancel}>Annuler</button>
    </form>
  );
}