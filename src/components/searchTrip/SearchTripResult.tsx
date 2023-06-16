import React from "react";
import ProfilSearchComponent from "../shared/ProfilSearchComponent";
import CardSearchTripResult from "./CardSearchTripResult";
interface PropsResult {
    date:Date,
    départ:string,
    arrivé:string,
    tarif:number,
    place:number,
    submitTrip:any
}
function SearchTripResult({date,départ,arrivé,tarif,place,submitTrip}:PropsResult) {
   
  
  return (
    <div className="flex flex-row w-1/1 border justify-between mb-10 p-5 hover:border-validBlue">
      <ProfilSearchComponent />
      <CardSearchTripResult date={date} départ={départ} arrivé={arrivé} tarif={tarif} place={place} submitTrip={submitTrip}/>
    
    
     
    </div>
    
  );
}

export default SearchTripResult;
