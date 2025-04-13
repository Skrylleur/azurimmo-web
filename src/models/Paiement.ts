import Contrat from "./Contrat";

export default interface Intervention {
  id?: number;
  datePaiement: Date;
  montant: number;
  contrat?: Partial<Contrat>;
}