"use client";
import Contrat from "@/models/Contrat";
import Link from "next/link";
import { useState } from "react";

export default function ContratComponent({ contrats: initialContrats }: {contrats: Contrat[]}) {
    const [contrats] = useState<Contrat[]>(initialContrats);

    return(
        <>
            <h2>Contrats</h2>
            <Link href="/">Retour à l&apos;accueil</Link>
            <ul>
                {contrats.map((contrat: Contrat) => (
                    <li key={contrat.id}>
                        {contrat.statut} - {new Date(contrat.dateEntree).toLocaleDateString()} - {new Date(contrat.dateSortie).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </>
    )
}