export default interface Intervention {
    map(arg0: (appartement: Intervention) => import("react").JSX.Element): import("react").ReactNode;
    id: number;
    description: string;
    typeInter: string;
    dateInter: Date;   
}