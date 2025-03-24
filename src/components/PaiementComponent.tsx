"use client";
import Paiement from "@/models/Paiement";
import Link from "next/link";

export default function PaiementComponent({ paiements }: { paiements: Paiement[] }) {
    console.log("Paiements affichés :", paiements); // ← garde ce log
  
    return (
      <>
        <ul>
          {paiements.map((paiement) => (
            <li key={paiement.id}>
              {new Date(paiement.datePaiement).toLocaleDateString("fr-FR")} - {paiement.montant}€
            </li>
          ))}
        </ul>
        <Link href="/">Retour à l&apos;accueil</Link>
      </>
    );
  }