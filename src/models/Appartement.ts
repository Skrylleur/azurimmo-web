import Batiment from "./Batiment";

export default interface Appartement {
  id?: number;
  numero: number;
  surface: number;
  nbPieces: number;
  description: string;
  batiment?: Partial<Batiment>;
}