"use client"

import Locataire from "@/models/Locataire";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { JSX, useEffect, useState } from "react";

type ContratFormProps = {
    onContratAdded: () => void;
};

export default function ContratForm({ onContratAdded }: ContratFormProps): JSX.Element {
    const [dateEntree, setDateEntree] = useState("");
    const [dateSortie, setDateSortie] = useState("");
    const [montantLoyer, setMontantLoyer] = useState("");
    const [montantCharges, setMontantCharges] = useState("");
    const [statut, setStatut] = useState("");
    const [locataires, setLocataires] = useState<Locataire[]>([]);
    const [selectedLocataire, setSelectedLocataire] = useState<Locataire | null>(null);
    const [queryLocataire, setQueryLocataire] = useState("");
    
    useEffect(() => {
      const fetchLocataires = async () => {
        const res = await fetch("http://localhost:9008/api/locataires");
        const data = await res.json();
        setLocataires(data);
      };
      fetchLocataires();
    }, []);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
          dateEntree,
          dateSortie,
          montantLoyer: parseFloat(montantLoyer),
          montantCharges: parseFloat(montantCharges),
          statut,
          locataire: selectedLocataire ? { id: selectedLocataire.id } : null,
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

    <Combobox value={selectedLocataire} onChange={setSelectedLocataire}>
    <Combobox.Label>Locataire</Combobox.Label>
    <div className="relative mt-1">
      <Combobox.Input
        className="input"
        displayValue={(locataire: Locataire) =>
          locataire ? `${locataire.prenom} ${locataire.nom}` : ""
        }
        onChange={(e) => setQueryLocataire(e.target.value)}
      />
      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
      </Combobox.Button>
      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 text-sm">
        {locataires
          .filter((l) =>
            `${l.prenom} ${l.nom}`
              .toLowerCase()
              .includes(queryLocataire.toLowerCase())
          )
          .map((locataire) => (
            <Combobox.Option
              key={locataire.id}
              value={locataire}
              className={({ active }) =>
                `cursor-pointer select-none px-4 py-2 ${
                  active ? "bg-blue-600 text-white" : "text-gray-900"
                }`
              }
            >
              {locataire.prenom} {locataire.nom}
            </Combobox.Option>
          ))}
      </Combobox.Options>
    </div>
  </Combobox>

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