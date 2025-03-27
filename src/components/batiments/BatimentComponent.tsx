"use client"
import API_URL from "@/constants/ApiUrl";
import Batiment from "@/models/Batiment";
import HttpService from "@/services/HttpServices";
import Link from "next/link";
import { useState } from "react";

export default function BatimentComponent({...props}:{batiments:Batiment[]}){
const [batiments, setBatiments] = useState<Batiment[]>(props.batiments);
    return (
        <>
      <h2>Bâtiments</h2>
        <Link href ={"/"}>Retour à l&apos;accueil</Link>

        <ul>
            {batiments.map((batiment:Batiment)=><li key={batiment.id}>
                {batiment.adresse} - {batiment.ville} <span onClick={
                    ()=>{
                        HttpService.delete(API_URL.batiments+batiment.id).then((response)=>{
                        if(response){
                            const newBatiments=batiments.filter((b:Batiment)=>b.id!==batiment.id);
                            setBatiments(newBatiments);
                    }
                        });
                    }
                }>X</span>
            </li>)
            }
        </ul>
      </>
    )
}