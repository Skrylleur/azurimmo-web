"use client";
import { useState } from "react";
import Contrat from "@/models/Contrat";
import { motion } from "framer-motion";

type EditContratFormProps = {
  contrat: Contrat;
  onCancel: () => void;
  onUpdate: (updatedContrat: Contrat) => void;
};

export default function EditContratForm({
  contrat,
  onCancel,
  onUpdate,
}: EditContratFormProps) {
const [dateEntree, setDateEntree] = useState(
    new Date(contrat.dateEntree).toISOString().split("T")[0]
  );
  const [dateSortie, setDateSortie] = useState(
    new Date(contrat.dateSortie).toISOString().split("T")[0]
  );
  const [montantLoyer, setMontantLoyer] = useState(contrat.montantLoyer.toString());
  const [montantCharges, setMontantCharges] = useState(contrat.montantLoyer.toString());
  const [statut, setStatut] = useState(contrat.statut.toString());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      dateEntree,
      dateSortie,
      montantLoyer: parseFloat(montantLoyer),
      montantCharges: parseFloat(montantCharges),
      statut,
    };

    try {
      const response = await fetch(`http://localhost:9008/api/contrats/${contrat.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }

      const updated = await response.json();
      onUpdate(updated); // on met à jour la liste
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.form
        layout
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        >
        <div className="flex flex-col sm:flex-row gap-2 w-full">
            <input className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
                type="date"
                value={dateEntree}
                onChange={(e) => setDateEntree(e.target.value)}
                required
            />
            <input className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
                type="date"
                value={dateSortie}
                onChange={(e) => setDateSortie(e.target.value)}
                required
            />
            <input className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
                type="number"
                value={montantLoyer}
                onChange={(e) => setMontantLoyer(e.target.value)}
                required
            />
            <input className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
                type="number"
                value={montantCharges}
                onChange={(e) => setMontantCharges(e.target.value)}
                required
            />
            <input className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
                type="string"
                value={statut}
                onChange={(e) => setStatut(e.target.value)}
                required
            />

      </div>
      <div className="flex gap-2">
        <button type="submit"
        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm">
            Valider</button>
        <button type="button" 
        onClick={onCancel}
        className="text-gray-500 hover:text-gray-700 px-3 py-1 text-sm">Annuler</button>
      </div>
    </motion.form>
  );
}