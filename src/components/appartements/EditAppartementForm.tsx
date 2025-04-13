"use client";

import { useState } from "react";
import Appartement from "@/models/Appartement";

type EditAppartementFormProps = {
  appartement: Appartement;
  onCancel: () => void;
  onUpdate: (updatedAppartement: Appartement) => void;
};

export default function EditAppartementForm({
  appartement,
  onCancel,
  onUpdate,
}: EditAppartementFormProps) {
  const [numero, setNumero] = useState(appartement.numero?.toString() ?? "");
  const [surface, setSurface] = useState(appartement.surface?.toString() ?? "");
  const [nbPieces, setNbPieces] = useState(appartement.nbPieces?.toString() ?? "");
  const [description, setDescription] = useState(appartement.description ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      numero: parseInt(numero),
      surface: parseFloat(surface),
      nbPieces: parseInt(nbPieces),
      description,
    };

    try {
      const response = await fetch(`http://localhost:9008/api/appartements/${appartement.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      const updated = await response.json();
      onUpdate(updated);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200 space-y-4 mt-4"
    >
      <h2 className="text-lg font-semibold text-gray-900">Modifier l’appartement</h2>

      <div className="grid gap-4">
        <input
          type="number"
          placeholder="Numéro"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />

        <input
          type="number"
          placeholder="Surface (en m²)"
          value={surface}
          onChange={(e) => setSurface(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />

        <input
          type="number"
          placeholder="Nombre de pièces"
          value={nbPieces}
          onChange={(e) => setNbPieces(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
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