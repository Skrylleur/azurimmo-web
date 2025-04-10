"use client";

import Garant from "@/models/Garant";
import Link from "next/link";
import { useEffect, useState } from "react";
import EditGarantForm from "./EditGarantForm";

export default function GarantComponent({ garants }: { garants: Garant[] }) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [garantList, setGarantList] = useState<Garant[]>(garants ?? []);
    
    
    // Synchronise le state local avec les garants reçus en prop
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
    
    const handleDelete = async (id: number) => {
        const confirm = window.confirm("Voulez-vous vraiment supprimer ce garant ?");
        if (!confirm) return;
      
        try {
          const res = await fetch(`http://localhost:9008/api/garants/${id}`, {
            method: "DELETE",
          });
      
          if (res.status === 204) {
            // Supprimer du state local
            setGarantList(prev => prev.filter(p => p.id !== id));
          } else {
            console.error("Échec de la suppression", res.status);
          }
        } catch (err) {
          console.error("Erreur lors de la suppression", err);
        }
      };

    return (
        <>
        <Link href="/" className="inline-block text-sm text-gray-500 hover:text-gray-700 underline transition">
        Retour à l&apos;accueil
        </Link>
        
        <div className="grid gap-4">
        {garantList.map((garant) => (
            <div
            key={garant.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-gray-200 rounded-lg shadow p-4"
            >
            {editingId === garant.id ? (
                <EditGarantForm
                garant={garant}
                onCancel={handleCancel}
                onUpdate={handleUpdate}
                />
            ) : (
                <>
                <div className="text-gray-800">
                    <span className="font-medium text-black">
                    {garant.prenom} {garant.nom}
                    </span>
                </div>

                <div className="mt-2 sm:mt-0 flex gap-2">
                    <button
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    onClick={() => setEditingId(garant.id)}
                    >
                    Modifier
                    </button>
                    <button
                    onClick={() => handleDelete(garant.id)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                    >
                    Supprimer
                    </button>                
                    </div>
                </>
            )} 
            {garantList.length === 0 && (
                <p className="text-center text-gray-400 italic">Aucun garant enregistré pour l’instant.</p>
              )}
            </div>
        ))}
        </div>          
        </>
      );  
}