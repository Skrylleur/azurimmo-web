import API_URL from "@/constants/ApiUrl";
import HttpService from "@/services/HttpServices";
import BatimentComponent from "@/components/batiments/BatimentComponent";

export default async function BatimentPage() {

    const batiments=await HttpService.get(API_URL.batiments);
    
    return (
      <>
        <BatimentComponent batiments={batiments}/>
      </>
    );
}