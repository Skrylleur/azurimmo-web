"use client"

import Contrat from "@/models/Contrat";
import { JSX, useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";

type PaiementFormProps = {
    onPaiementAdded: () => void;
};

export default function PaiementForm({ onPaiementAdded }: PaiementFormProps): JSX.Element {
    const [montant, setMontant] = useState("");
    const [datePaiement, setDatePaiement] = useState("");
    const [contrats, setContrats] = useState<Contrat[]>([]);
    const [selectedContrat, setSelectedContrat] = useState<Contrat | null>(null);
    const [query, setQuery] = useState("");

    useEffect(() => {
      const fetchContrats = async () => {
        const res = await fetch("http://localhost:9008/api/contrats");
        const data = await res.json();
        setContrats(data);
      };
      fetchContrats();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            datePaiement,
            montant: parseFloat(montant),
            contrat: selectedContrat ? { id: selectedContrat.id } : null
        };


        try {
            const response = await fetch("http://localhost:9008/api/paiements", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Erreur ${response.status}: ${response.statusText}`);
            }

            if (!selectedContrat) {
                alert("Veuillez sélectionner un contrat.");
                return;
              }
            const newPaiement = await response.json();
            console.log("Nouveau paiement ajouté :", newPaiement);

            onPaiementAdded();

            setMontant("");
            setDatePaiement("");
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
        }
    };

    const filteredContrats =
    query === ""
        ? contrats
        : contrats.filter((contrat) =>
            contrat.statut.toLowerCase().includes(query.toLowerCase())
    );

    // ⬇️ Ce return est essentiel !
    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="sm:col-span-2">
        <Combobox value={selectedContrat} onChange={setSelectedContrat}>
            <Combobox.Label className="block text-sm font-medium text-gray-700 mb-1">
            Sélectionner un contrat
            </Combobox.Label>

            <div className="relative mt-1">
            <Combobox.Input
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                displayValue={(contrat: Contrat) =>
                contrat ? `${contrat.id} - ${contrat.statut}` : ""
                }
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un contrat..."
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
            </Combobox.Button>

            {filteredContrats.length > 0 && (
                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 text-sm">
                {filteredContrats.map((contrat) => (
                    <Combobox.Option
                    key={contrat.id}
                    value={contrat}
                    className={({ active }) =>
                        `cursor-pointer select-none px-4 py-2 ${
                        active ? "bg-blue-600 text-white" : "text-gray-900"
                        }`
                    }
                    >
                    {contrat.id} - {contrat.statut}
                    </Combobox.Option>
                ))}
                </Combobox.Options>
            )}
            </div>
        </Combobox>
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-1">Montant du paiement :</label>
        <input
            type="number"
            placeholder="Montant"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Date de paiement :</label>
        <input
            type="date"
            value={datePaiement}
            onChange={(e) => setDatePaiement(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />

        <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
        >
        Ajouter
        </button>        
        </form>
    );
}