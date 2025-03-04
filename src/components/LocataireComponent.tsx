"use client";
import Locataire from "@/models/Locataire";
import Link from "next/link";
import { useState } from "react";

export default function LocataireComponent({ locataires: initialLocataires }: {locataires: Locataire[]}) {
    const [locataires] = useState<Locataire[]>(initialLocataires);

    return(
        <>
            <h2>Locataires</h2>
            <Link href="/">Retour à l&apos;accueil</Link>
            <ul>
                {locataires.map((locataire: Locataire) => (
                    <li key={locataire.id}>
                        {locataire.prenom} {locataire.prenom}
                    </li>
                ))}
            </ul>
        </>
    )
}