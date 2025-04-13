import Contrat from "./Contrat";

export default interface Garant {
  id?: number;
  nom: string;
  prenom: string;
  contrat?: Partial<Contrat>;
}