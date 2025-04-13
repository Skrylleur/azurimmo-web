import Appartement from "./Appartement";

export default interface Contrat {
    id?: number;
    dateEntree: Date;
    dateSortie: Date;
    montantLoyer: number;
    montantCharges: number;
    statut: string;
    appartement?: Partial<Appartement>
}