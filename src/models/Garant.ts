export default interface Garant {
    map(arg0: (garant: Garant) => import("react").JSX.Element): import("react").ReactNode;
    id: number;
    nom: string;
    prenom: string;
}