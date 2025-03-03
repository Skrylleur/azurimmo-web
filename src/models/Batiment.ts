export default interface Batiment {
    map(arg0: (batiment: Batiment) => import("react").JSX.Element): import("react").ReactNode;
    id: number;
    adresse: string;
    ville: string;
}