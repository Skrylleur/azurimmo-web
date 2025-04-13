"use client";
import { useEffect, useState } from "react";
import Appartement from "@/models/Appartement";
import Batiment from "@/models/Batiment";

type AppartementFormProps = {
  onAppartementAdded: () => void;
};

export default function AppartementForm({ onAppartementAdded }: AppartementFormProps) {
  const [numero, setNumero] = useState("");
  const [surface, setSurface] = useState("");
  const [nbPieces, setNbPieces] = useState("");
  const [description, setDescription] = useState("");
  const [batimentId, setBatimentId] = useState("");
  const [batiments, setBatiments] = useState<Batiment[]>([]);

  useEffect(() => {
    const fetchBatiments = async () => {
      try {
        const res = await fetch("http://localhost:9008/api/batiments");
        const data = await res.json();
        setBatiments(data);
      } catch (err) {
        console.error("Erreur lors du chargement des bâtiments :", err);
      }
    };
    fetchBatiments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newAppartement: Partial<Appartement> = {
      numero: parseInt(numero),
      surface: parseFloat(surface),
      nbPieces: parseInt(nbPieces),
      description,
      batiment: { id: Number(batimentId) }, // 👈 lien avec le bâtiment
    };

    try {
      const res = await fetch("http://localhost:9008/api/appartements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAppartement),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout");

      onAppartementAdded();

      // Réinitialiser les champs
      setNumero("");
      setSurface("");
      setNbPieces("");
      setDescription("");
      setBatimentId("");
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'appartement :", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="number"
        placeholder="Numéro"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
        required
      />
      <input
        type="number"
        placeholder="Surface"
        value={surface}
        onChange={(e) => setSurface(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
        required
      />
      <input
        type="number"
        placeholder="Nombre de pièces"
        value={nbPieces}
        onChange={(e) => setNbPieces(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
        required
      />
      <select
        value={batimentId}
        onChange={(e) => setBatimentId(e.target.value)}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
      >
        <option value="">-- Choisir un bâtiment --</option>
        {batiments.map((b) => (
          <option key={b.id} value={b.id}>
            {b.adresse} - {b.ville}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Ajouter l&apos;appartement
      </button>
    </form>
  );
}