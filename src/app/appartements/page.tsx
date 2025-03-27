import API_URL from "@/constants/ApiUrl";
import HttpService from "@/services/HttpServices";
import AppartementComponent from "@/components/appartements/AppartementComponent";

export default async function AppartementPage() {

    const appartements=await HttpService.get(API_URL.appartements);
    
    return (
      <>
        <AppartementComponent appartements={appartements}/>
      </>
    );
}