import API_URL from "@/constants/ApiUrl";
import HttpService from "@/services/HttpServices";
import PaiementComponent from "@/components/PaiementComponent";

export default async function PaiementPage() {

    const paiements=await HttpService.get(API_URL.paiements);
    
    return (
      <>
        <PaiementComponent paiements={paiements}/>
      </>
    );
}