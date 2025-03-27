"use client";

import Garant from "@/models/Garant";
import Link from "next/link";
import { useState } from "react";

export default function GarantComponent({ garants: initialGarants }: {garants: Garant[]}) {
    const [garants] = useState<Garant[]>(initialGarants);

    return(
        <>
            <h2>Garants</h2>
            <Link href="/">Retour à l&apos;accueil</Link>
            <ul>
                {garants.map((garant: Garant) => (
                    <li key={garant.id}>
                        {garant.prenom} {garant.prenom}
                    </li>
                ))}
            </ul>
        </>
    )

}