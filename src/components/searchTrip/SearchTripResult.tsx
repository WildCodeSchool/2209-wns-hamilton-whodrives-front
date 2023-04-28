import React from "react";
import ProfilSearchComponent from "../shared/ProfilSearchComponent";

function SearchTripResult() {
  return (
    <div className="flex flex-row w-1/4 border justify-between mt-10">
      <ProfilSearchComponent />
      <div className="flex flex-col justify-between">
        <p>16/09/2023</p>
        <div className="flex flex-row">
          <p>Arcachon</p>
          <img src="assets/icons/arrow-right-black.svg" alt=""  className=" mr-3 ml-3"/>
          <p>Bayonne</p>
        </div>
        <p>Prix du trajet : 20€</p>
      </div>
      <div >
        <p className="text-#1195C3">Place Disponibles</p>
        <p>2</p>
      </div>
    </div>
    
  );
}

export default SearchTripResult;
