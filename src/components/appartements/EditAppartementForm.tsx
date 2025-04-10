"use client";
import { useState } from "react";
import Appartement from "@/models/Appartement";
import { motion } from "framer-motion";

type EditAppartementFormProps = {
  appartement: Appartement;
  onCancel: () => void;
  onUpdate: (updatedAppartement: Appartement) => void;
};

export default function EditAppartementForm({
  appartement,
  onCancel,
  onUpdate,
}: EditAppartementFormProps) {
    const [numero, setNumero] = useState(appartement.numero?.toString() ?? "");
    const [surface, setSurface] = useState(appartement.surface?.toString() ?? "");
    const [nbPieces, setNbPieces] = useState(appartement.nbPieces?.toString() ?? "");
    const [description, setDescription] = useState(appartement.description?.toString() ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      numero: parseFloat(numero),
      surface: parseFloat(surface),
      nbPieces: parseFloat(nbPieces),
      description
    };

    try {
      const response = await fetch(`http://localhost:9008/api/appartements/${appartement.id}`, {
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
                type="number"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                required
            />
            <input className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
                type="number"
                value={surface}
                onChange={(e) => setSurface(e.target.value)}
                required
            />
            <input className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
              type="number" 
              value={nbPieces}
              onChange={(e) => setNbPieces(e.target.value)}
              required
            />
            <input className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
              type="string" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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