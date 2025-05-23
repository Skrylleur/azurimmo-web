"use client";

import { useEffect, useState } from "react";
import Garant from "@/models/Garant";
import Contrat from "@/models/Contrat";

type GarantFormProps = {
  onGarantAdded: () => void;
};

export default function GarantForm({ onGarantAdded }: GarantFormProps) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [contrats, setContrats] = useState<Contrat[]>([]);
  const [contratId, setContratId] = useState("");
  
  useEffect(() => {
    const fetchContrats = async () => {
      try {
        const res = await fetch("http://localhost:9008/api/contrats");
        const data = await res.json();
        setContrats(data);
      } catch (err) {
        console.error("Erreur lors du chargement des contrats :", err);
      }
    };
    fetchContrats();
  }, []);

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newGarant: Partial<Garant> = {
      nom,
      prenom,
      contrat: { id: Number(contratId) },
    };

    try {
      const res = await fetch("http://localhost:9008/api/garants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGarant),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout");

      onGarantAdded();

      // Réinitialisation des champs
      setNom("");
      setPrenom("");
      setContratId("");
    } catch (err) {
      console.error("Erreur lors de l'ajout du garant :", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Nom du garant"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
        required
      />
      <input
        type="text"
        placeholder="Prénom du garant"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
        required
      />
      <select
        value={contratId}
        onChange={(e) => setContratId(e.target.value)}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
      >
        <option value="">-- Choisir un contrat --</option>
        {contrats.map((c) => (
          <option key={c.id} value={c.id}>
            Contrat du {new Date(c.dateEntree).toLocaleDateString("fr-FR")} au {new Date(c.dateSortie).toLocaleDateString("fr-FR")}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Ajouter le garant
      </button>
    </form>
  );
}