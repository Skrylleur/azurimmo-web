import API_URL from "@/constants/ApiUrl";
import HttpService from "@/services/HttpServices";
import BatimentComponent from "@/components/ContratComponent";

export default async function BatimentPage() {

    const contrats=await HttpService.get(API_URL.contrats);
    
    return (
      <>
        <BatimentComponent contrats={contrats}/>
      </>
    );
}