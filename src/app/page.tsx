import Link from "next/link";

export default function Home() {
  const liens = [
    { nom: "Bâtiments", href: "/batiments" },
    { nom: "Appartements", href: "/appartements" },
    { nom: "Interventions", href: "/interventions" },
    { nom: "Contrats", href: "/contrats" },
    { nom: "Garants", href: "/garants" },
    { nom: "Locataires", href: "/locataires" },
    { nom: "Paiements", href: "/paiements" },
  ];

  return (
    <main className="min-h-screen bg-[#F9FAFB] text-gray-800 px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-semibold text-center text-gray-900">Bienvenue sur Azur-Immo</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {liens.map((lien) => (
            <Link
              key={lien.nom}
              href={lien.href}
              className="block p-5 bg-white rounded-xl shadow-sm ring-1 ring-gray-200 hover:ring-blue-300 hover:shadow-md transition"
            >
              <span className="text-lg font-medium text-gray-700">{lien.nom}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
