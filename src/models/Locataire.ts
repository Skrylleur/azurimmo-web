import Contrat from "./Contrat";

export default interface Appartement {
  id?: number;
  dateN: Date;
  lieuN: string;
  nom: string;
  prenom: string;
  contrat?: Partial<Contrat>;
}