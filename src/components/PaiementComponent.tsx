"use client";
import Paiement from "@/models/Paiement";
import Link from "next/link";
import { useState } from "react";

export default function PaiementComponent({ paiements: initialPaiements }: {paiements: Paiement[]}) {
    const [paiements] = useState<Paiement[]>(initialPaiements);

    return(
        <>
            <h2>Paiements</h2>
            <Link href="/">Retour à l&apos;accueil</Link>
            <ul>
                {paiements.map((paiement: Paiement) => (
                    <li key={paiement.id}>
                        {new Date(paiement.datePaiement).toLocaleDateString()} - {paiement.montant}€
                    </li>
                ))}
            </ul>
        </>
    )
}