export default interface Paiement {
    map(arg0: (paiement: Paiement) => import("react").JSX.Element): import("react").ReactNode;
    id: number;
    montant: number;
    datePaiement: Date;
}