"use client";

import Appartement from "@/models/Appartement";
import { useEffect, useState } from "react";
import EditAppartementForm from "./EditAppartementForm";
import { useRouter } from "next/navigation";

export default function AppartementList({ appartements }: { appartements: Appartement[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [appartementList, setAppartementList] = useState<Appartement[]>(appartements ?? []);

  useEffect(() => {
    if (Array.isArray(appartements)) {
      setAppartementList(appartements);
    }
  }, [appartements]);

  const handleUpdate = (updated: Appartement) => {
    setAppartementList((prev) =>
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
        {appartementList.length === 0 ? (
          <p className="text-center text-gray-400 italic">Aucun appartement enregistré pour l’instant.</p>
        ) : (
          appartementList.map((appartement) => (
            <div
              key={appartement.id}
              className="bg-white border border-gray-200 rounded-lg shadow p-4 hover:bg-gray-100 transition"
            >
              {editingId === appartement.id ? (
                <EditAppartementForm
                  appartement={appartement}
                  onCancel={handleCancel}
                  onUpdate={handleUpdate}
                />
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => router.push(`/appartements/${appartement.id}`)}
                >
                  <div className="text-gray-800">
                    <span className="font-medium text-black">
                      Appartement n°{appartement.numero} – {appartement.description}
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