export default interface Intervention {
  id?: number;
  description: string;
  typeInter: string;
  dateInter: Date;
  statut?: string;
  appartement: { id: number };
}