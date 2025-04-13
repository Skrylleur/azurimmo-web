"use client";

import Batiment from "@/models/Batiment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BatimentComponent({ batiments }: { batiments: Batiment[] }) {
  const [batimentList, setBatimentList] = useState<Batiment[]>(batiments ?? []);
  const router = useRouter();

  useEffect(() => {
    if (Array.isArray(batiments)) {
      setBatimentList(batiments);
    }
  }, [batiments]);

  return (
    <>
      <Link
        href="/"
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm transition"
      >
        Retour à l&apos;accueil
      </Link>

      <div className="grid gap-4">
        {batimentList.map((batiment) => (
          <div
            key={batiment.id}
            onClick={() => router.push(`/batiments/${batiment.id}`)}
            className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow p-4 hover:bg-gray-100 transition"
          >
            <div className="text-gray-800">
              <span className="font-medium text-black">
                {batiment.adresse} - {batiment.ville}
              </span>
            </div>
          </div>
        ))}

        {batimentList.length === 0 && (
          <p className="text-center text-gray-400 italic">
            Aucun bâtiment enregistré pour l’instant.
          </p>
        )}
      </div>
    </>
  );
}