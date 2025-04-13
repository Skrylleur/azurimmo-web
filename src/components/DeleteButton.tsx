import { useRouter } from "next/navigation";

interface DeleteButtonProps {
    entity: string;
    id: number | undefined;
    redirectTo: string;
    label?: string;
  }

  export default function DeleteButton({
    entity,
    id,
    redirectTo,
    label = "Supprimer",
  }: DeleteButtonProps) {
    const router = useRouter();
  
    const handleDelete = async () => {
      if (id === undefined) {
        alert("L'identifiant est manquant.");
        return;
      }
  
      const confirmed = confirm("Êtes-vous sûr de vouloir supprimer ?");
      if (!confirmed) return;
  
      try {
        const res = await fetch(`http://localhost:9008/api/${entity}/${id}`, {
          method: "DELETE",
        });
  
        if (!res.ok) throw new Error("Échec de la suppression");
  
        router.push(redirectTo);
      } catch (err) {
        console.error("Erreur :", err);
        alert("Erreur lors de la suppression.");
      }
    };
  
    return (
      <button
        onClick={handleDelete}
        disabled={id === undefined}
        className={`${
          id === undefined
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        } text-white px-4 py-2 rounded-md text-sm`}
      >
        {label}
      </button>
    );
  }