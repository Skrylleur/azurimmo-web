"use client";

import { useState } from "react";
import Appartement from "@/models/Appartement";

type BatimentMinimal = {
    id: number;
  };

interface AddAppartementFormProps {
  batimentId: number;
  onAppartAdded: () => void;
  onCancel?: () => void;
}

export default function AddAppartementForm({
  batimentId,
  onAppartAdded,
  onCancel,
}: AddAppartementFormProps) {
  const [numero, setNumero] = useState("");
  const [surface, setSurface] = useState("");
  const [nbPieces, setNbPieces] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newAppartement: Partial<Appartement> = {
      numero: parseInt(numero),
      surface: parseFloat(surface),
      nbPieces: parseInt(nbPieces),
      description,
      batiment: { id: batimentId } as BatimentMinimal,
    };

    try {
      const res = await fetch("http://localhost:9008/api/appartements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAppartement),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout de l'appartement");

      onAppartAdded();
      setNumero("");
      setSurface("");
      setNbPieces("");
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mt-4 bg-white p-4 rounded-lg shadow-sm ring-1 ring-gray-200"
    >
      <h2 className="text-xl font-semibold">Ajouter un appartement</h2>

      <input
        type="text"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        placeholder="Numéro"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        required
      />

      <input
        type="number"
        step="0.1"
        value={surface}
        onChange={(e) => setSurface(e.target.value)}
        placeholder="Surface (en m²)"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        required
      />

      <input
        type="number"
        value={nbPieces}
        onChange={(e) => setNbPieces(e.target.value)}
        placeholder="Nombre de pièces"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
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