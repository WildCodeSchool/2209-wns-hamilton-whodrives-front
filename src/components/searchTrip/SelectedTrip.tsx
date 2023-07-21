import "../../styles/global.css";

import ProfileSearchComponent from "../shared/ProfileSearchComponent";

interface IPropsSelectedTrip {
  departure: string;
  arrival: string;
  seats: number;
  price: number;
  date: string;
  nameProfil: string;
  stepBack: React.MouseEventHandler<HTMLDivElement>;
  joinTrip: React.MouseEventHandler<HTMLButtonElement>;
  hour: string;
}

export default function SelectedTrip({
  departure,
  arrival,
  seats,
  price,
  date,
  stepBack,
  nameProfil,
  joinTrip,
  hour,
}: IPropsSelectedTrip): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center w-screen font-bold h-1/1">
      <div
        className="flex flex-row mb-5 hover:cursor-pointer "
        onClick={stepBack}
      >
        <img src="/assets/icons/chevron-left.svg" alt="" />
        <p className="text-whodrivesGrey">Revenir à la liste des trajets </p>
      </div>
      <div className="flex flex-row w-3/5 p-4 pl-10 pr-10 ml-auto mr-auto border h-1/1 mb-28 ">
        <div className="flex flex-col justify-around w-1/2 pr-5 border-r-2 border-whodrivesGrey-400">
          <p>{date}</p>
          <div className="flex flex-row justify-between mb-4 w-1/1">
            <p>departure : {departure}</p>
            <p>{hour}</p>
          </div>
          <div className="flex flex-row justify-between mb-4 w-1/1">
            <p>arrival : {arrival}</p>
          </div>
          <p className="mb-4">Durée : non renseigné</p>
          <p className="mb-4">Places disponibles : {seats}</p>
        </div>
        <div className="w-1/2">
          <div className="flex flex-row justify-between mb-10">
            <ProfileSearchComponent nameProfil={nameProfil} />
            <button>Voir le profil</button>
          </div>
          <div className="mb-10 ml-11">
            <p>Préférences</p>
            <div className="flex flex-row">
              <img src="/assets/icons/animal-blue.svg" alt="" />
              <img src="/assets/icons/music-blue.svg" alt="" />
            </div>
          </div>

          <p className="ml-11">Prix du trajet par passager : {price} €</p>
        </div>
      </div>
      <button
        className="flex justify-center w-56 pt-5 pb-5 pl-24 pr-24 text-white align-middle border border-black shadow-md bg-whodrivesGreen selectedTripButton"
        onClick={joinTrip}
      >
        REJOINDRE
      </button>
    </div>
  );
}
