"use client";

import { useState } from "react";
import Garant from "@/models/Garant";

interface AddGarantFormProps {
  contratId: number;
  onGarantAdded: () => void;
  onCancel?: () => void;
}

export default function AddGarantForm({
  contratId,
  onGarantAdded,
  onCancel,
}: AddGarantFormProps) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newGarant: Partial<Garant> = {
      nom,
      prenom,
      contrat: { id: contratId },
    };

    try {
      const res = await fetch("http://localhost:9008/api/garants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGarant),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout du garant");

      onGarantAdded();

      // Réinitialisation des champs
      setNom("");
      setPrenom("");
    } catch (err) {
      console.error("Erreur lors de l'ajout du garant :", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mt-4 bg-white p-4 rounded-lg shadow-sm ring-1 ring-gray-200"
    >
      <h2 className="text-xl font-semibold">Ajouter un garant</h2>

      <input
        type="text"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        placeholder="Nom"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        required
      />

      <input
        type="text"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
        placeholder="Prénom"
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