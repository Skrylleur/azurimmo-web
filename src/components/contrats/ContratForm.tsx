"use client";
import { useEffect, useState } from "react";
import Contrat from "@/models/Contrat";
import Appartement from "@/models/Appartement";

type ContratFormProps = {
  onContratAdded: () => void;
};

export default function ContratForm({ onContratAdded }: ContratFormProps) {
  const [dateEntree, setDateEntree] = useState("");
  const [dateSortie, setDateSortie] = useState("");
  const [montantLoyer, setMontantLoyer] = useState("");
  const [montantCharges, setMontantCharges] = useState("");
  const [statut, setStatut] = useState("");
  const [appartementId, setAppartementId] = useState("");
  const [appartements, setAppartements] = useState<Appartement[]>([]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newContrat: Partial<Contrat> = {
      dateEntree: new Date(dateEntree),
      dateSortie: new Date(dateSortie),
      montantLoyer: parseInt(montantLoyer),
      montantCharges: parseInt(montantCharges),
      statut,
      appartement: { id: Number(appartementId) },
    };

    try {
      const res = await fetch("http://localhost:9008/api/contrats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContrat),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout");

      onContratAdded();

      // Réinitialiser les champs
      setDateEntree("");
      setDateSortie("");
      setMontantLoyer("");
      setMontantCharges("");
      setStatut("");
      setAppartementId("");
    } catch (err) {
      console.error("Erreur lors de l'ajout du contrat :", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="date"
        placeholder="Date d'entrée"
        value={dateEntree}
        onChange={(e) => setDateEntree(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
        required
      />
      <input
        type="date"
        placeholder="Date sortie"
        value={dateSortie}
        onChange={(e) => setDateSortie(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
        required
      />
      <input
        type="number"
        placeholder="Montant loyer"
        value={montantLoyer}
        onChange={(e) => setMontantLoyer(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
        required
      />
      <input
        type="number"
        placeholder="Montant charges"
        value={montantCharges}
        onChange={(e) => setMontantCharges(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
        required
      />
      <input
        type="text"
        placeholder="Statut"
        value={statut}
        onChange={(e) => setStatut(e.target.value)}
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
            {a.description} - Appartement N°{a.numero}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Ajouter le contrat
      </button>
    </form>
  );
}