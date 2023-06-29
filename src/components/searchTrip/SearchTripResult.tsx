import ProfileSearchComponent from "../shared/ProfileSearchComponent";
import CardSearchTripResult from "./CardSearchTripResult";

interface PropsResult {
  date: any;
  departure: string;
  arrival: string;
  price: number;
  seats: number;
  nameProfil: string;
  value: any;
  hoverSetId: any;
  submitTrip: any;
}

function SearchTripResult({
  date,
  departure,
  arrival,
  price,
  seats,
  nameProfil,
  value,
  hoverSetId,
  submitTrip,
}: PropsResult) {
  return (
    <div className="flex flex-row justify-between p-5 mb-10 border w-1/1 hover:border-validBlue">
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
      />
    </div>
  );
}

export default SearchTripResult;
