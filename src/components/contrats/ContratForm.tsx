"use client"

import { JSX, useState } from "react";

type ContratFormProps = {
    onContratAdded: () => void;
};

export default function ContratForm({ onContratAdded }: ContratFormProps): JSX.Element {
    const [dateEntree, setDateEntree] = useState("");
    const [dateSortie, setDateSortie] = useState("");
    const [montantLoyer, setMontantLoyer] = useState("");
    const [montantCharges, setMontantCharges] = useState("");
    const [statut, setStatut] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            dateEntree,
            dateSortie,
            montantLoyer,
            montantCharges,
            statut,
            contrat: { id: 1 }
        };

        try {
            const response = await fetch("http://localhost:9008/api/contrats", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Erreur ${response.status}: ${response.statusText}`);
            }

            const newContrat = await response.json();
            console.log("Nouveau contrat ajouté :", newContrat);

            onContratAdded();

            setDateEntree("");
            setDateSortie("");
            setMontantLoyer("");
            setMontantCharges("");
            setStatut("");
            
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
        }
    };

    return (
<form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">Date d&apos;entrée</label>
    <input
      type="date"
      value={dateEntree}
      onChange={(e) => setDateEntree(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
    />


  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Date de sortie</label>
    <input
      type="date"
      value={dateSortie}
      onChange={(e) => setDateSortie(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Montant loyer</label>
    <input
      type="number"
      value={montantLoyer}
      onChange={(e) => setMontantLoyer(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm appearance-none"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Montant charges</label>
    <input
      type="number"
      value={montantCharges}
      onChange={(e) => setMontantCharges(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm appearance-none"
    />
  </div>

  <div className="sm:col-span-2">
    <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
    <input
      type="text"
      value={statut}
      onChange={(e) => setStatut(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
    />
  </div>

  <div className="sm:col-span-2 flex justify-end">
    <button
      type="submit"
      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-600 transition" 
      
    >
      Ajouter
    </button>
  </div>
</form>
    );
}