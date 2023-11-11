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

  const isDisabled = !departure || !arrival || !date || !time || !passengers;

  return (
    <div className="flex flex-col items-center justify-center py-5">
      <div className="w-full p-8 bg-lightBlue sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/5">
        <div className="flex flex-col pb-4">
          <label className="text-center" htmlFor="depart">
            Ville de départ
          </label>
          <div className="relative">
            <input
              type="text"
              id="depart"
              placeholder="Départ"
              value={departure}
              onChange={handleDepartureChange}
              className="w-full p-2 border border-whodrivesGrey focus:outline-validBlue"
            />
            {showDepartureOptions && departureOptions.length > 0 && (
              <ul className="absolute z-10 w-full p-4 mt-2 bg-white border border-gray-300">
                {departureOptions.map((option, index) => (
                  <li key={index}>
                    <button
                      className="w-full text-left"
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
        <div className="flex flex-col pb-4">
          <label className="text-center" htmlFor="arrivee">
            Destination
          </label>
          <div className="relative">
            <input
              type="text"
              id="arrivee"
              placeholder="Destination"
              value={arrival}
              onChange={handleArrivalChange}
              className="w-full p-2 border border-whodrivesGrey focus:outline-validBlue"
            />
            {showArrivalOptions && arrivalOptions.length > 0 && (
              <ul className="absolute z-10 w-full p-4 mt-2 bg-white border border-gray-300">
                {arrivalOptions.map((option, index) => (
                  <li key={index}>
                    <button
                      className="w-full text-left"
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
        <div className="flex flex-col md:flex-row md:gap-4">
          <div className="flex flex-col pb-4 mx-auto sm:w-1/2 sm:flex-1">
            <label className="text-center" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              //afficher la date de aujourdui par defaut
              value={date || trip.date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border border-whodrivesGrey focus:outline-validBlue"
            />
          </div>
          <div className="flex flex-col pb-4 mx-auto sm:w-1/2 sm:flex-1">
            <label className="text-center" htmlFor="heure">
              Heure
            </label>
            <input
              type="time"
              id="heure"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="p-2 border border-whodrivesGrey focus:outline-validBlue"
            />
          </div>
        </div>
        <div className="flex flex-col ">
          <label className="text-center" htmlFor="nombrePersonnes">
            Nombre de places disponibles
          </label>
          <div className="flex flex-row items-center justify-center">
            <button
              className="px-4"
              onClick={() => setPassengers(Math.max(1, passengers - 1))}
            >
              <img src="/assets/icons/minus.svg" alt="minus icon" />
            </button>
            <input
              type="number"
              id="nombrePersonnes"
              value={passengers || trip.passengers}
              onChange={(e) => setPassengers(parseInt(e.target.value))}
              className="flex w-6 font-bold text-center"
            />
            <button
              className="px-4"
              onClick={() => setPassengers(passengers + 1)}
            >
              <img src="/assets/icons/plus.svg" alt="minus icon" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="p-4"
          // The button is disabled if the fields are not filled
          disabled={isDisabled}
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
          <p
            className={
              isDisabled
                ? "grey-button p-2 text-xs"
                : "green-button p-2 text-xs"
            }
          >
            Suivant
          </p>
        </button>
      </div>
    </div>
  );
}

export default LocationFields;
