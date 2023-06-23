import React from "react";
import ProfilSearchComponent from "../shared/ProfilSearchComponent";
import "../../styles/global.css";

interface PropsSelectedTrip {
  départ: string;
  arrivée: string;
  place: number;
  prix: number;
  date: any;
  stepBack: any;
  joinTrip:any
}
function SelectedTrip({
  départ,
  arrivée,
  place,
  prix,
  date,
  stepBack,
  joinTrip
}: PropsSelectedTrip) {
  return (
    <div className="w-screen h-1/1  font-bold flex justify-center flex-col items-center">
      <div
        className="flex flex-row hover:cursor-pointer mb-5 "
        onClick={stepBack}
      >
        <img src="/assets/icons/chevron-left.svg" alt="" />
        <p className="text-whodrivesGrey">Revenir à la liste des trajets </p>
      </div>
      <div className="w-3/5 border h-1/1 flex flex-row pl-10 pr-10 ml-auto mr-auto p-4 mb-28 ">
        <div className="w-1/2 border-whodrivesGrey-400 border-r-2 flex flex-col pr-5 justify-around">
          <p>{date}</p>
          <div className="flex flex-row w-1/1 justify-between mb-4">
            <p>départ : {départ}</p>
            <p>8h00</p>
          </div>
          <div className="flex flex-row w-1/1 justify-between mb-4">
            <p>arrivée : {arrivée}</p>
            <p>10h30</p>
          </div>
          <p className="mb-4">durée : 2h30</p>
          <p className="mb-4">place disponible : {place}</p>
        </div>
        <div className="w-1/2">
          <div className="flex flex-row justify-between mb-10">
            <ProfilSearchComponent nameProfil="antoine"/>
            <button>Voir le profil</button>
          </div>
          <div className="ml-11 mb-10">
            <p>Preference</p>
            <div className="flex flex-row">
              <img src="/assets/icons/animal-blue.svg" alt="" />
              <img src="/assets/icons/music-blue.svg" alt="" />
            </div>
          </div>

          <p className="ml-11">Prix du trajet par passager : {prix} €</p>
        </div>
      </div>
      <button className="
      w-56 bg-whodrivesGreen 
      pl-24 pr-24 pt-5 pb-5 
      align-middle flex justify-center 
      border border-black
       text-white 
       selectedTripButton 
       shadow-md
       " onClick={joinTrip}>
        REJOINDRE
      </button>
    </div>
  );
}

export default SelectedTrip;
