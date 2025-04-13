"use client";
import { useState } from "react";
import Intervention from "@/models/Intervention";
import { motion } from "framer-motion";

type EditInterventionFormProps = {
  intervention: Intervention;
  onCancel: () => void;
  onUpdate: (updatedIntervention: Intervention) => void;
};

export default function EditInterventionForm({
  intervention,
  onCancel,
  onUpdate,
}: EditInterventionFormProps) {
    const [description, setDescription] = useState(intervention.description?.toString() ?? "");
    const [dateInter, setDateInter] = useState(intervention.dateInter?.toString() ?? "");
    const [typeInter, setTypeInter] = useState(intervention.typeInter?.toString() ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      description,
      dateInter: parseFloat(dateInter),
      typeInter
    };

    try {
      const response = await fetch(`http://localhost:9008/api/interventions/${intervention.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }

      const updated = await response.json();
      onUpdate(updated);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.form
        layout
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-200 space-y-4 mt-4"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        >
        <div className="grid gap-4">
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            <input
                type="date"
                value={dateInter}
                onChange={(e) => setDateInter(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            <input
              type="text" 
              value={typeInter}
              onChange={(e) => setTypeInter(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Valider
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          Annuler
        </button>
      </div>
    </motion.form>
  );
}