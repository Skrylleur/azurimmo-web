"use client";

import { useState } from "react";
import Locataire from "@/models/Locataire";

interface AddLocataireFormProps {
  contratId: number;
  onLocataireAdded: () => void;
  onCancel?: () => void;
}

export default function AddLocataireForm({
  contratId,
  onLocataireAdded,
  onCancel,
}: AddLocataireFormProps) {
  const [dateN, setDateN] = useState("");
  const [lieuN, setLieuN] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newLocataire: Partial<Locataire> = {
      dateN: new Date(dateN),
      lieuN,
      nom,
      prenom,
      contrat: { id: contratId },
    };

    try {
      const res = await fetch("http://localhost:9008/api/locataires", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLocataire),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout du locataire");

      onLocataireAdded();

      // Réinitialisation des champs
      setDateN("");
      setLieuN("");
      setNom("");
      setPrenom("");
    } catch (err) {
      console.error("Erreur lors de l'ajout du locataire :", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mt-4 bg-white p-4 rounded-lg shadow-sm ring-1 ring-gray-200"
    >
      <h2 className="text-xl font-semibold">Ajouter un locataire</h2>

      <input
        type="date"
        value={dateN}
        onChange={(e) => setDateN(e.target.value)}
        placeholder="Date de naissance"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        required
      />

      <input
        type="text"
        value={lieuN}
        onChange={(e) => setLieuN(e.target.value)}
        placeholder="Lieu de naissance"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        required
      />

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