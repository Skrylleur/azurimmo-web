import Batiment from "./Batiment";

export default interface Maintenance {
  id: number;
  typeInter: string;
  dateInter: string;
  commentaire: string;
  nomIntervenant: string;
  frequence: string;
  batiment: Batiment;
}