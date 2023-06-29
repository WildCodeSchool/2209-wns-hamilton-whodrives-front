import ProfilSearchComponent from "../shared/ProfilSearchComponent";
interface PropsResult {
  date: any;
  départ: string;
  arrivé: string;
  tarif: number;
  place: number;
  value : any,
  hoverSetId :any,
  hour:string
  submitTrip: any;
}
function CardSearchTripResult({
  date,
  départ,
  arrivé,
  tarif,
  place,
  submitTrip,
  hoverSetId,
  hour,
  value
}: PropsResult) {
  return (
    <>
      <div className="w-1/1 flex flex-col pl-2 pr-2 justify-between mr-8 ">
        <p>{date}</p>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <p>{départ}</p>
            <p>{hour}h</p>
          </div>

          <img
            src="assets/icons/arrow-right-black.svg"
            alt=""
            className=" mr-3 ml-3"
          />
          <div className="flex flex-col">
            <p>{arrivé}</p>
            <p>10h30</p>
          </div>
        </div>
        <p>Prix du trajet : {tarif}€</p>
      </div>

      <div className="flex flex-col w-1/1 mr-10">
        <p className="text-#1195C3">Place Disponibles : {place}</p>
        <button onClick={submitTrip} onMouseEnter={hoverSetId} className="border border-black" value={value}>
          j'y vais
        </button>
      </div>
    </>
  );
}

export default CardSearchTripResult;
