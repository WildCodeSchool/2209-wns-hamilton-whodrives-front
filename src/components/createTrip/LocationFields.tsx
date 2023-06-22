import { useEffect, useState } from "react";

function LocationFields({ handleLocationFieldData, trip }: any) {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [showDepartureOptions, setShowDepartureOptions] = useState(false);
  const [showArrivalOptions, setShowArrivalOptions] = useState(false);

  useEffect(() => {
    ifTripDataIsComplete();
  }, []);

  function ifTripDataIsComplete() {
    if (
      trip.departure &&
      trip.arrival &&
      trip.date &&
      trip.time &&
      trip.passengers
    ) {
      setDeparture(trip.departure);
      setArrival(trip.arrival);
      setDate(trip.date);
      setTime(trip.time);
      setPassengers(trip.passengers);
    }
  }

  const [departureOptions, setDepartureOptions] = useState<string[]>([]);
  const [arrivalOptions, setArrivalOptions] = useState<string[]>([]);

  const getCityOptions = async (word: string, isDeparture: boolean) => {
    try {
      const response = await fetch(
        `https://geo.api.gouv.fr/communes?nom=${word}&fields=population&limit=5`
      );
      const json = await response.json();
      const cityOptions = json.map((e: any) => e.nom);
      if (isDeparture) {
        setDepartureOptions(cityOptions);
      } else {
        setArrivalOptions(cityOptions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDepartureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDeparture(value);
    setShowDepartureOptions(value !== ""); // Affiche la liste uniquement si l'input n'est pas vide
  };

  const handleArrivalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setArrival(value);
    setShowArrivalOptions(value !== ""); // Affiche la liste uniquement si l'input n'est pas vide
  };

  useEffect(() => {
    if (departure) {
      getCityOptions(departure, true);
    } else {
      setDepartureOptions([]);
    }
  }, [departure]);

  useEffect(() => {
    if (arrival) {
      getCityOptions(arrival, false);
    } else {
      setArrivalOptions([]);
    }
  }, [arrival]);

  const handleDepartureOptionClick = (option: string) => {
    setDeparture(option);
    setShowDepartureOptions(false);
  };

  const handleArrivalOptionClick = (option: string) => {
    setArrival(option);
    setShowArrivalOptions(false);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center my-custom-class">
      <h2 className="text-lg font-semibold text-center mb-4 ">
        Je publie un trajet
      </h2>
      <div className="bg-lightBlue p-8 mx-auto w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/5">
        <div className="flex flex-col space-y-2">
          <label className="text-center" htmlFor="depart">
            Départ
          </label>
          <div className="relative">
            <input
              type="text"
              id="depart"
              value={departure}
              onChange={handleDepartureChange}
              className="w-full border border-gray-300 p-2"
            />
            {showDepartureOptions && departureOptions.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 p-4 mt-2 w-full">
                {departureOptions.map((option, index) => (
                  <li key={index}>
                    <button
                      className="text-left w-full"
                      onClick={() => handleDepartureOptionClick(option)}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-center" htmlFor="arrivee">
            Arrivée
          </label>
          <div className="relative">
            <input
              type="text"
              id="arrivee"
              value={arrival}
              onChange={handleArrivalChange}
              className="w-full border border-gray-300 p-2"
            />
            {showArrivalOptions && arrivalOptions.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 p-4 mt-2 w-full">
                {arrivalOptions.map((option, index) => (
                  <li key={index}>
                    <button
                      className="text-left w-full"
                      onClick={() => handleArrivalOptionClick(option)}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="flex flex-col space-y-2 sm:w-1/2 sm:flex-1">
            <label className="text-center" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              //afficher la date de aujourdui par defaut
              value={date || trip.date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 p-2"
            />
          </div>
          <div className="flex flex-col space-y-2 sm:w-1/2 sm:flex-1">
            <label className="text-center" htmlFor="heure">
              Heure
            </label>
            <input
              type="time"
              id="heure"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border border-gray-300 p-2"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2 ">
          <label className="text-center" htmlFor="nombrePersonnes">
            Nombre de personnes
          </label>
          <input
            type="number"
            id="nombrePersonnes"
            value={passengers || trip.passengers}
            onChange={(e) => setPassengers(parseInt(e.target.value))}
            className="w-1/6 border border-gray-300 p-2 justify-center mx-auto"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-whodrivesGrey text-white py-2 px-4 mt-6 "
          //le bouton est disabled si les champs ne sont pas remplis
          disabled={!departure || !arrival || !date || !time || !passengers}
          onClick={() =>
            handleLocationFieldData({
              departure,
              arrival,
              date,
              time,
              passengers,
            })
          }
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default LocationFields;
