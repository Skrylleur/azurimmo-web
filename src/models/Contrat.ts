export default interface Contrat {
    map(arg0: (contrat: Contrat) => import("react").JSX.Element): import("react").ReactNode;
    id: number;
    dateEntree: Date;
    dateSortie: Date;
    montantLoyer: number;
    montantCharges: number;
    statut: string;
}