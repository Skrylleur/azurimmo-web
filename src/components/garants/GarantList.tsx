"use client";

import Garant from "@/models/Garant";
import { useEffect, useState } from "react";
import EditGarantForm from "./EditGarantForm";
import { useRouter } from "next/navigation";

export default function GarantList({ garants }: { garants: Garant[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [garantList, setGarantList] = useState<Garant[]>(garants ?? []);

  useEffect(() => {
    if (Array.isArray(garants)) {
      setGarantList(garants);
    }
  }, [garants]);

  const handleUpdate = (updated: Garant) => {
    setGarantList((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <>
      <div className="grid gap-4 mt-6">
        {garantList.length === 0 ? (
          <p className="text-center text-gray-400 italic">Aucune intervention enregistrée pour l’instant.</p>
        ) : (
          garantList.map((garant) => (
            <div
              key={garant.id}
              className="bg-white border border-gray-200 rounded-lg shadow p-4 hover:bg-gray-100 transition"
            >
              {editingId === garant.id ? (
                <EditGarantForm
                  garant={garant}
                  onCancel={handleCancel}
                  onUpdate={handleUpdate}
                />
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => router.push(`/garants/${garant.id}`)}
                >
                  <div className="text-gray-800">
                    <span className="font-medium text-black">
                      Garant : {garant.prenom} {garant.nom}
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