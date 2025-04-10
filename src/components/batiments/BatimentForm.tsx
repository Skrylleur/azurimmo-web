"use client"

import { JSX, useState } from "react";

type BatimentFormProps = {
    onBatimentAdded: () => void;
};

export default function BatimentForm({ onBatimentAdded }: BatimentFormProps): JSX.Element {
    const [adresse, setAdresse] = useState("");
    const [ville, setVille] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            adresse,
            ville,
            batiment: { id: 1 }
        };

        try {
            const response = await fetch("http://localhost:9008/api/batiments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Erreur ${response.status}: ${response.statusText}`);
            }

            const newBatiment = await response.json();
            console.log("Nouveau bâtiment ajouté :", newBatiment);

            onBatimentAdded();

            setAdresse("");
            setVille("");
            
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
        }
    };

    return (
<form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse :</label>
    <input
      type="string"
      value={adresse}
      onChange={(e) => setAdresse(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
    />
    </div>
    
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Ville :</label>
    <input
      type="string"
      value={ville}
      onChange={(e) => setVille(e.target.value)}
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