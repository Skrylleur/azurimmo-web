"use client";

import { useEffect, useState } from "react";
import Locataire from "@/models/Locataire";
import Contrat from "@/models/Contrat";

type LocataireFormProps = {
  onLocataireAdded: () => void;
};

export default function LocataireForm({ onLocataireAdded }: LocataireFormProps) {
  const [dateN, setDateN] = useState("");
  const [lieuN, setLieuN] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [contratId, setContratId] = useState("");
  const [contrats, setContrats] = useState<Contrat[]>([]);

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

    const newLocataire: Partial<Locataire> = {
      dateN: new Date(dateN),
      lieuN,
      nom,
      prenom,
      contrat: { id: Number(contratId) },
    };

    try {
      const res = await fetch("http://localhost:9008/api/locataires", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLocataire),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout");

      onLocataireAdded();

      // Réinitialisation des champs
      setLieuN("");
      setDateN("");
      setNom("");
      setPrenom("");
      setContratId("");
    } catch (err) {
      console.error("Erreur lors de l'ajout du locataire :", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="date"
        placeholder="Date de naissance"
        value={dateN}
        onChange={(e) => setDateN(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
        required
      />
      <input
        type="text"
        placeholder="Lieu de naissance"
        value={lieuN}
        onChange={(e) => setLieuN(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
        required
      />
      <input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
        required
      />
      <input
        type="text"
        placeholder="Prénom"
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
        Ajouter du locataire
      </button>
    </form>
  );
}