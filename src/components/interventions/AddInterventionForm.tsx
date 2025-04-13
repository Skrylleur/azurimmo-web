"use client";

import { useState } from "react";
import Intervention from "@/models/Intervention";

interface AddInterventionFormProps {
  appartementId: number;
  onInterventionAdded: () => void;
  onCancel?: () => void;
}

export default function AddInterventionForm({
  appartementId,
  onInterventionAdded,
  onCancel,
}: AddInterventionFormProps) {
  const [description, setDescription] = useState("");
  const [typeInter, setTypeInter] = useState("");
  const [dateInter, setDateInter] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newIntervention: Partial<Intervention> = {
      description,
      typeInter,
      dateInter: new Date(dateInter),
      appartement: { id: appartementId },
    };

    try {
      const res = await fetch("http://localhost:9008/api/interventions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newIntervention),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout de l'intervention");

      onInterventionAdded();

      // Réinitialisation des champs
      setDescription("");
      setTypeInter("");
      setDateInter("");
      console.log("Données envoyées :", newIntervention);
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'intervention :", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mt-4 bg-white p-4 rounded-lg shadow-sm ring-1 ring-gray-200"
    >
      <h2 className="text-xl font-semibold">Ajouter une intervention</h2>

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        required
      />

      <input
        type="date"
        value={dateInter}
        onChange={(e) => setDateInter(e.target.value)}
        placeholder="Date d'intervention"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        required
      />

      <input
        type="text"
        value={typeInter}
        onChange={(e) => setTypeInter(e.target.value)}
        placeholder="Type d'intervention"
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