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
          <ul>
            {paiementList.map((paiement) => (
              <li key={paiement.id}>
                {editingId === paiement.id ? (
                  <EditPaiementForm
                    paiement={paiement}
                    onCancel={handleCancel}
                    onUpdate={handleUpdate}
                  />
                ) : (
                <>
                {new Date(paiement.datePaiement).toLocaleDateString("fr-FR")} - {paiement.montant}€

                <button
                    className="ml-2"
                    onClick={() => setEditingId(paiement.id)}
                >
                    Modifier
                </button>

                <button
                    className="ml-2"
                    onClick={() => handleDelete(paiement.id)}
                >
                    Supprimer
                </button>
                </>                
            )}
              </li>
            ))}
          </ul>
          <Link href="/">Retour à l&apos;accueil</Link>
        </>
      );  
}