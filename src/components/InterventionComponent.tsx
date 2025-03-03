"use client";
import Intervention from "@/models/Intervention";
import Link from "next/link";
import { useState } from "react";

export default function InterventionComponent({ interventions: initialInterventions }: { interventions: Intervention}) {
    const [interventions] = useState<Intervention[]>(initialInterventions);

    return(
        <>
            <h2>Interventions</h2>
            <Link href="/">Retour à l&apos;accueil</Link>
            <ul>
                {interventions.map((intervention: Intervention) => (
                    <li key={intervention.id}>
                        {intervention.typeInter} - {intervention.dateInter.toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </>
    );
}