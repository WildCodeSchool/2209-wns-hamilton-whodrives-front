import "../../styles/global.css";

import ProfileSearchComponent from "../shared/ProfileSearchComponent";

interface IPropsSelectedTrip {
  departure: string;
  arrival: string;
  seats: number;
  price: number;
  date: string;
  nameProfil: string;
  stepBack: React.MouseEventHandler<HTMLButtonElement>;
  joinTrip: React.MouseEventHandler<HTMLButtonElement>;
  hour: string;
}

export default function SelectedTrip({
  departure,
  arrival,
  price,
  date,
  stepBack,
  nameProfil,
  joinTrip,
  hour,
}: IPropsSelectedTrip): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center w-full py-5">
      <div className="w-3/5 p-4 mb-4 bg-white border-2 lg:w-2/5 border-validBlue">
        <h3 className="mb-4 text-center text-validBlue">Détails du trajet</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-100">
            <div className="flex flex-col items-center">
              <p>Votre conducteur : </p>
              <ProfileSearchComponent nameProfil={nameProfil} />
            </div>
            <div className="flex justify-center gap-4 mb-2">
              <p>Date de départ : {date}</p>
              <p>Heure de départ : {hour}</p>
            </div>
            <div className="flex justify-center mb-2">
              <p>Ville de départ : {departure}</p>
              <img
                src="assets/icons/arrow-right-black.svg"
                alt=""
                className="mx-2"
              />
              <p>Ville d'arrivée : {arrival}</p>
            </div>
            <div className="flex justify-center">
              <p>Prix du trajet par passager : {price} €</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button className="p-4" onClick={stepBack}>
          <p className="font-bold text-whodrivesGrey hover:text-validBlue">
            Retour
          </p>
        </button>
        <button className="p-4" onClick={joinTrip}>
          <p className="p-2 text-xs green-button">Rejoindre ce trajet</p>
        </button>
      </div>
    </div>
  );
}
