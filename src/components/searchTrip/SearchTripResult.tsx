import React from "react";
import ProfilSearchComponent from "../shared/ProfilSearchComponent";
import CardSearchTripResult from "./CardSearchTripResult";
interface PropsResult {
    date:any,
    départ:string,
    arrivé:string,
    tarif:number,
    place:number,
    nameProfil:string,
    value :any
    hoverSetId:any
    submitTrip:any
}
function SearchTripResult({date,départ,arrivé,tarif,place,nameProfil,value,hoverSetId,submitTrip}:PropsResult) {
   
  
  return (
    <div className="flex flex-row w-1/1 border justify-between mb-10 p-5 hover:border-validBlue" >
      <ProfilSearchComponent nameProfil={nameProfil}/>
      <CardSearchTripResult date={date} départ={départ} arrivé={arrivé} tarif={tarif} place={place} submitTrip={submitTrip} hoverSetId={hoverSetId} value={value}/>
      
    
     
    </div>
    
  );
}

export default SearchTripResult;
