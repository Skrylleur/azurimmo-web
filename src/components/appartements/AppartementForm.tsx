"use client"

import { JSX, useState } from "react";

type AppartementFormProps = {
    onAppartementAdded: () => void;
};

export default function AppartementForm({ onAppartementAdded }: AppartementFormProps): JSX.Element {
    const [numero, setNumero] = useState("");
    const [surface, setSurface] = useState("");
    const [nbPieces, setNbPieces] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            numero,
            surface,
            nbPieces,
            description,
            appartement: { id: 1 }
        };

        try {
            const response = await fetch("http://localhost:9008/api/appartements", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Erreur ${response.status}: ${response.statusText}`);
            }

            const newAppartement = await response.json();
            console.log("Nouvel appartement ajouté :", newAppartement);

            onAppartementAdded();

            setNumero("");
            setSurface("");
            setNbPieces("");
            setDescription("");
            
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
        }
    };

    return (
<form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro d&apos;appartement :</label>
    <input
      type="number"
      value={numero}
      onChange={(e) => setNumero(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
    />

  </div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Surface :</label>
    <input 
      type="number"
      value={surface}
      onChange={(e) => setSurface(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
    />
  <div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de pièces :</label>
    <input
      type="string"
      value={nbPieces}
      onChange={(e) => setNbPieces(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
    />
    </div>

    <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Description :</label>
    <input
      type="text"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
    />
    </div>

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