"use client";

import Locataire from "@/models/Locataire";
import Link from "next/link";
import { useEffect, useState } from "react";
import EditLocataireForm from "./EditLocataireForm";
import { useRouter } from "next/navigation";

export default function LocataireList({ locataires }: { locataires: Locataire[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [locataireList, setLocataireList] = useState<Locataire[]>(locataires ?? []);

  useEffect(() => {
    if (Array.isArray(locataires)) {
      setLocataireList(locataires);
    }
  }, [locataires]);

  const handleUpdate = (updated: Locataire) => {
    setLocataireList((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <>
      <Link href="/" className="inline-block text-sm text-gray-500 hover:text-gray-700 underline transition">
        Retour à l&apos;accueil
      </Link>

      <div className="grid gap-4 mt-6">
        {locataireList.length === 0 ? (
          <p className="text-center text-gray-400 italic">Aucun locataire enregistré pour l’instant.</p>
        ) : (
          locataireList.map((locataire) => (
            <div
              key={locataire.id}
              className="bg-white border border-gray-200 rounded-lg shadow p-4 hover:bg-gray-100 transition"
            >
              {editingId === locataire.id ? (
                <EditLocataireForm
                  locataire={locataire}
                  onCancel={handleCancel}
                  onUpdate={handleUpdate}
                />
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => router.push(`/locataires/${locataire.id}`)}
                >
                  <div className="text-gray-800">
                    <span className="font-medium text-black">
                      Locataire : {locataire.prenom} {locataire.nom}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}