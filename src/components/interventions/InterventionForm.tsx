"use client"

import { JSX, useState } from "react";

type InterventionFormProps = {
    onInterventionAdded: () => void;
};

export default function InterventionForm({ onInterventionAdded }: InterventionFormProps): JSX.Element {
    const [description, setDescription] = useState("");
    const [typeInter, setTypeInter] = useState("");
    const [dateInter, setDateInter] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            description,
            typeInter,
            dateInter,
            intervention: { id: 1 }
        };

        try {
            const response = await fetch("http://localhost:9008/api/interventions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Erreur ${response.status}: ${response.statusText}`);
            }

            const newIntervention = await response.json();
            console.log("Nouveau garant ajouté :", newIntervention);

            onInterventionAdded();

            setDescription("");
            setTypeInter("");
            setDateInter("");
            
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
        }
    };

    return (
<form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Description :</label>
    <input
      type="string"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
    />
    </div>
    
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Type d&apos;intervention : :</label>
    <input
      type="string"
      value={typeInter}
      onChange={(e) => setTypeInter(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
    />
  </div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Date d&apos;intervention :</label>
    <input 
      type="date"
      value={dateInter}
      onChange={(e) => setDateInter(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
    />
  <div>

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