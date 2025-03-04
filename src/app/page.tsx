import Link from "next/link";

export default function Home() {
  return (
    <>
    <h1>Azur-Immo</h1>
    <ul>
      <li>
      <Link href ={"/batiments"}>Bâtiments</Link>
      </li>
      <li>
      <Link href ={"/appartements"}>Appartements</Link>
      </li>
      <li>
      <Link href ={"/interventions"}>Interventions</Link>
      </li>
      <li>
      <Link href ={"/contrats"}>Contrats</Link>
      </li>
      <li>
      <Link href ={"/garants"}>Garants</Link>
      </li>
      <li>
      <Link href ={"/locataires"}>Locataires</Link>
      </li>
      <li>
      <Link href ={"/paiements"}>Paiements</Link>
      </li>
    </ul>
    </>
  );
}