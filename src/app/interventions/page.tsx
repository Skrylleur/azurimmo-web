import API_URL from "@/constants/ApiUrl";
import HttpService from "@/services/HttpServices";
import InterventionComponent from "@/components/InterventionComponent";

export default async function InterventionPage() {

    const interventions=await HttpService.get(API_URL.interventions);
    
    return (
      <>
        <InterventionComponent interventions={interventions}/>
      </>
    );
}