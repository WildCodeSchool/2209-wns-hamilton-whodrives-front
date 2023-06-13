import ProfilSearchComponent from "../shared/ProfilSearchComponent";
interface PropsResult {
    date:Date,
    départ:string,
    arrivé:string,
    tarif:number,
    place:number,
    submitTrip:any
}
function CardSearchTripResult({date,départ,arrivé,tarif,place,submitTrip}:PropsResult) {
  return (
<>
<div className="w-1/1 flex flex-col pl-2 pr-2 justify-between  ">
        <p>{date.toDateString()}</p>
        <div className="flex flex-row">
          <p>{départ}</p>
          <img src="assets/icons/arrow-right-black.svg" alt=""  className=" mr-3 ml-3"/>
          <p>{arrivé}</p>
        </div>
        <p>Prix du trajet : {tarif}€</p>
      </div>
     
      <div className="flex flex-col w-1/1" >
        <p className="text-#1195C3">Place Disponibles : {place}</p>
        <button onClick={submitTrip}>j'y vais</button>
      </div>
</>
    
  );
}

export default CardSearchTripResult;
