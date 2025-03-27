"use client"

import { JSX, useState } from "react";

type LocataireFormProps = {
    onLocataireAdded: () => void;
};

export default function LocataireForm({ onLocataireAdded }: LocataireFormProps): JSX.Element {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [dateN, setDateN] = useState("");
    const [lieuN, setLieuN] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            nom,
            prenom,
            dateN,
            lieuN,
            locataire: { id: 1 }
        };

        try {
            const response = await fetch("http://localhost:9008/api/locataires", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Erreur ${response.status}: ${response.statusText}`);
            }

            const newLocataire = await response.json();
            console.log("Nouveau locataire ajouté :", newLocataire);

            onLocataireAdded();

            setNom("");
            setPrenom("");
            setDateN("");
            setLieuN("");
            
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
        }
    };

    return (
<form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Nom :</label>
    <input
      type="string"
      value={nom}
      onChange={(e) => setNom(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
    />
    </div>
    
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom :</label>
    <input
      type="string"
      value={prenom}
      onChange={(e) => setPrenom(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance :</label>
    <input
      type="date"
      value={dateN}
      onChange={(e) => setDateN(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm appearance-none"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Lieu de naissance :</label>
    <input
      type="string"
      value={lieuN}
      onChange={(e) => setLieuN(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm appearance-none"
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