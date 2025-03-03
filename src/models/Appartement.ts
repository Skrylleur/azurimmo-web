export default interface Appartement {
    map(arg0: (appartement: Appartement) => import("react").JSX.Element): import("react").ReactNode;
    id: number;
    numero: number;
    surface: GLfloat;
    nb_pieces: number;
    description: string;
}