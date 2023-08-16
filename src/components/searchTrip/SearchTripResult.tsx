import ProfileSearchComponent from "../shared/ProfileSearchComponent";
import CardSearchTripResult from "./CardSearchTripResult";

interface IPropsResult {
  date: string;
  departure: string;
  arrival: string;
  price: number;
  seats: number;
  nameProfil: string;
  value: number;
  hoverSetId: any;
  hour: any;
  submitTrip: React.MouseEventHandler<HTMLButtonElement>;
}

export default function SearchTripResult({
  date,
  departure,
  arrival,
  price,
  seats,
  nameProfil,
  value,
  hoverSetId,
  hour,
  submitTrip,
}: IPropsResult): JSX.Element {
  return (
    <div className="flex flex-row justify-between w-full p-5 mb-10 overflow-auto border-2 hover:border-validBlue">
      <div className="ml-10">
        <ProfileSearchComponent nameProfil={nameProfil} />
      </div>
      <CardSearchTripResult
        date={date}
        departure={departure}
        arrival={arrival}
        price={price}
        seats={seats}
        submitTrip={submitTrip}
        hoverSetId={hoverSetId}
        value={value}
        hour={hour}
      />
    </div>
  );
}
