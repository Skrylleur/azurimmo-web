"use client";

import { useEffect, useState } from "react";
import Paiement from "@/models/Paiement";
import Contrat from "@/models/Contrat";

type PaiementFormProps = {
  onPaiementAdded: () => void;
};

export default function PaiementForm({ onPaiementAdded }: PaiementFormProps) {
  const [datePaiement, setDatePaiement] = useState("");
  const [montant, setMontant] = useState("");
  const [contratId, setContratId] = useState("");
  const [contrats, setContrats] = useState<Contrat[]>([]);

  useEffect(() => {
    const fetchContrats = async () => {
      try {
        const res = await fetch("http://localhost:9008/api/contrats");
        const data = await res.json();
        setContrats(data);
      } catch (err) {
        console.error("Erreur lors du chargement des appartements :", err);
      }
    };
    fetchContrats();
  }, []);

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPaiement: Partial<Paiement> = {
      datePaiement: new Date(datePaiement),
      montant: parseFloat(montant),
      contrat: { id: Number(contratId) },
    };

    try {
      const res = await fetch("http://localhost:9008/api/paiements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPaiement),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout");

      onPaiementAdded();

      // Réinitialisation des champs
      setDatePaiement("");
      setMontant("");
      setContratId("");
    } catch (err) {
      console.error("Erreur lors de l'ajout du contrat :", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="date"
        placeholder="Date de paiement"
        value={datePaiement}
        onChange={(e) => setDatePaiement(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
        required
      />
      <input
        type="number"
        placeholder="Montant du paiement"
        value={montant}
        onChange={(e) => setMontant(e.target.value)}
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
            Contrat du {new Date(c.dateEntree).toLocaleDateString("fr-FR")} - {new Date(c.dateSortie).toLocaleDateString("fr-FR")}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Ajouter le paiement
      </button>
    </form>
  );
}