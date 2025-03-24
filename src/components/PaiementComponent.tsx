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
                  </>
                )}
              </li>
            ))}
          </ul>
          <Link href="/">Retour à l&apos;accueil</Link>
        </>
      );  
}