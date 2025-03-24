"use client";
import Paiement from "@/models/Paiement";
import EditPaiementForm from "@/components/EditPaiementForm";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PaiementComponent({ paiements }: { paiements: Paiement[] }) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [paiementList, setPaiementList] = useState<Paiement[]>([]);

    // Synchronise le state local avec les paiements reçus en prop
    useEffect(() => {
    setPaiementList(paiements);
    }, [paiements]);
  
    const handleUpdate = (updated: Paiement) => {
      setPaiementList((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      setEditingId(null);
    };
  
    const handleCancel = () => {
      setEditingId(null);
    };
    
    const handleDelete = async (id: number) => {
        const confirm = window.confirm("Voulez-vous vraiment supprimer ce paiement ?");
        if (!confirm) return;
      
        try {
          const res = await fetch(`http://localhost:9008/api/paiements/${id}`, {
            method: "DELETE",
          });
      
          if (res.status === 204) {
            // Supprimer du state local
            setPaiementList(prev => prev.filter(p => p.id !== id));
          } else {
            console.error("Échec de la suppression", res.status);
          }
        } catch (err) {
          console.error("Erreur lors de la suppression", err);
        }
      };

    return (
        <>
        <Link href="/" className="inline-block text-sm text-gray-500 hover:text-gray-700 underline transition">
        Retour à l&apos;accueil
        </Link>
        
        <div className="grid gap-4">
        {paiementList.map((paiement) => (
            <div
            key={paiement.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-gray-200 rounded-lg shadow p-4"
            >
            {editingId === paiement.id ? (
                <EditPaiementForm
                paiement={paiement}
                onCancel={handleCancel}
                onUpdate={handleUpdate}
                />
            ) : (
                <>
                <div className="text-gray-800">
                    <span className="font-medium text-black">
                    {new Date(paiement.datePaiement).toLocaleDateString("fr-FR")}
                    </span>{" "}
                    - {paiement.montant}€
                </div>

                <div className="mt-2 sm:mt-0 flex gap-2">
                    <button
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    onClick={() => setEditingId(paiement.id)}
                    >
                    Modifier
                    </button>
                    <button
                    onClick={() => handleDelete(paiement.id)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                    >
                    Supprimer
                    </button>                
                    </div>
                </>
            )} 
            {paiementList.length === 0 && (
                <p className="text-center text-gray-400 italic">Aucun paiement enregistré pour l’instant.</p>
              )}
            </div>
        ))}
        </div>          
        </>
      );  
}