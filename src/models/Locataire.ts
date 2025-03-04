export default interface Locataire {
    map(arg0: (locataire: Locataire) => import("react").JSX.Element): import("react").ReactNode;
    id: number;
    nom: string;
    prenom: string;
    dateN: Date;
    lieuN: string;
}