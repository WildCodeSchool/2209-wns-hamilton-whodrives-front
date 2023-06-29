interface PropsResult {
  date: any;
  departure: string;
  arrival: string;
  price: number;
  seats: number;
  value: any;
  hoverSetId: any;
  submitTrip: any;
}

function CardSearchTripResult({
  date,
  departure,
  arrival,
  price,
  seats,
  submitTrip,
  hoverSetId,
  value,
}: PropsResult) {
  return (
    <>
      <div className="flex flex-col justify-between pl-2 pr-2 mr-8 w-1/1 ">
        <p>{date}</p>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <p>{departure}</p>
            <p>8h00</p>
          </div>

          <img
            src="assets/icons/arrow-right-black.svg"
            alt=""
            className="ml-3 mr-3 "
          />
          <div className="flex flex-col">
            <p>{arrival}</p>
            <p>10h30</p>
          </div>
        </div>
        <p>Prix du trajet : {price}€</p>
      </div>

      <div className="flex flex-col mr-10 w-1/1">
        <p className="text-#1195C3">Places Disponibles : {seats}</p>
        <button
          onClick={submitTrip}
          onMouseEnter={hoverSetId}
          className="border border-black"
          value={value}
        >
          J'y vais
        </button>
      </div>
    </>
  );
}

export default CardSearchTripResult;
