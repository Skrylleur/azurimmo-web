import Contrat from "./Contrat";

export default interface Locataire {
  id: number;
  nom: string;
  prenom: string;
  dateN: string;
  lieuN: string;
  contrat?: Contrat;
}