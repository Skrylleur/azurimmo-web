"use client";

import { useEffect, useState } from "react";
import Intervention from "@/models/Intervention";
import Appartement from "@/models/Appartement";

type InterventionFormProps = {
  onInterventionAdded: () => void;
};

export default function InterventionForm({ onInterventionAdded }: InterventionFormProps) {
  const [description, setDescription] = useState("");
  const [dateInter, setDateInter] = useState("");
  const [typeInter, setTypeInter] = useState("");
  const [appartementId, setAppartementId] = useState("");
  const [appartements, setAppartements] = useState<Appartement[]>([]);

  // Chargement de la liste des appartements
  useEffect(() => {
    const fetchAppartements = async () => {
      try {
        const res = await fetch("http://localhost:9008/api/appartements");
        const data = await res.json();
        setAppartements(data);
      } catch (err) {
        console.error("Erreur lors du chargement des appartements :", err);
      }
    };
    fetchAppartements();
  }, []);

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newIntervention: Partial<Intervention> = {
      description,
      dateInter: new Date(dateInter),
      typeInter,
      appartement: { id: Number(appartementId) },
    };

    try {
      const res = await fetch("http://localhost:9008/api/interventions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newIntervention),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout");

      onInterventionAdded();

      // Réinitialisation des champs
      setDescription("");
      setDateInter("");
      setTypeInter("");
      setAppartementId("");
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'intervention :", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
        required
      />
      <input
        type="date"
        placeholder="Date d'intervention"
        value={dateInter}
        onChange={(e) => setDateInter(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
        required
      />
      <input
        type="text"
        placeholder="Type d'intervention"
        value={typeInter}
        onChange={(e) => setTypeInter(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
        required
      />
      <select
        value={appartementId}
        onChange={(e) => setAppartementId(e.target.value)}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
      >
        <option value="">-- Choisir un appartement --</option>
        {appartements.map((a) => (
          <option key={a.id} value={a.id}>
            Appartement N°{a.numero} - {a.description}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Ajouter l&apos;intervention
      </button>
    </form>
  );
}