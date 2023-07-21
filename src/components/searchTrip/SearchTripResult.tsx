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
    <div className="flex flex-row justify-between p-5 mb-10 overflow-auto border w-1/1 hover:border-validBlue">
      <ProfileSearchComponent nameProfil={nameProfil} />
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
