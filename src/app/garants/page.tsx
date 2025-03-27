import API_URL from "@/constants/ApiUrl";
import HttpService from "@/services/HttpServices";
import GarantComponent from "@/components/garants/GarantComponent";

export default async function GarantPage() {

    const garants=await HttpService.get(API_URL.garants);
    
    return (
      <>
        <GarantComponent garants={garants}/>
      </>
    );
}