"use client";
import Appartement from "@/models/Appartement";
import Link from "next/link";
import { useState } from "react";

export default function AppartementComponent({ appartements: initialAppartements }: { appartements: Appartement[] }) {
    const [appartements] = useState<Appartement[]>(initialAppartements);
    
    return (
        <>
            <h2>Appartements</h2>
            <Link href="/">Retour à l&apos;accueil</Link>
            <ul>
                {appartements.map((appartement: Appartement) => (
                    <li key={appartement.id}>
                        {appartement.numero} - {appartement.description}
                    </li>
                ))}
            </ul>
        </>
    );
}
