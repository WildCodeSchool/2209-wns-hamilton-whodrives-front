interface IPropsResult {
  date: string;
  departure: string;
  arrival: string;
  price: number;
  seats: number;
  value: number;
  hoverSetId: any;
  hour: string;
  submitTrip: any;
}

export default function CardSearchTripResult({
  date,
  departure,
  arrival,
  price,
  seats,
  submitTrip,
  hoverSetId,
  hour,
  value,
}: IPropsResult): JSX.Element {
  return (
    <>
      <div className="flex flex-col justify-between px-2 mx-8 w-1/1 ">
        <p>{date}</p>
        <div className="flex flex-row">
          <p>{departure}</p>
          <img
            src="assets/icons/arrow-right-black.svg"
            alt=""
            className="ml-3 mr-3 "
          />
          <p>{arrival}</p>
        </div>
        <p>Heure de départ : {hour}</p>
        <p>Prix du trajet : {price}€</p>
      </div>
      <div className="flex flex-col mr-10 my-auto gap-2 w-1/1">
        <p>Places Disponibles : {seats}</p>
        <button
          className="p-4"
          onMouseEnter={hoverSetId}
          onClick={submitTrip}
          value={value}
        >
          <p className="p-2 text-xs green-button">J'y vais</p>
        </button>
      </div>
    </>
  );
}
