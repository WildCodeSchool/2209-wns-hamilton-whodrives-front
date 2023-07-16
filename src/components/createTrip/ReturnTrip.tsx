import { useEffect, useState } from "react";
function ReturnTrip({ trip, setSkipReturnTrip, handlReturnTripData }: any) {
  const [showReturn, setShowReturn] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [showDepartureOptions, setShowDepartureOptions] = useState(false);
  const [showArrivalOptions, setShowArrivalOptions] = useState(false);
  const [departureOptions, setDepartureOptions] = useState<string[]>([]);
  const [arrivalOptions, setArrivalOptions] = useState<string[]>([]);

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
      setDeparture(trip.arrival);
      setArrival(trip.departure);
      setDate(trip.date);
      setTime(trip.time);
      setPassengers(trip.passengers);
    }
  }

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
    <div className="flex flex-col items-center justify-center">
      <div className="w-4/5 mx-auto text-center md:w-1/1 lg:w-1/1">
        {showReturn ? (
          <div className="flex flex-col items-center justify-center">
            <div className="w-full p-8 mx-auto bg-lightBlue sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/5">
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
                    className="w-full p-2 border border-gray-300"
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
                    className="w-full p-2 border border-gray-300"
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
                    className="p-2 border border-gray-300"
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
                    className="p-2 border border-gray-300"
                  />
                </div>
              </div>
              {/* <div className="flex flex-col space-y-2 ">
                <label className="text-center" htmlFor="nombrePersonnes">
                  Nombre de personnes
                </label>
                <input
                  type="number"
                  id="nombrePersonnes"
                  value={passengers || trip.passengers}
                  onChange={(e) => setPassengers(parseInt(e.target.value))}
                  className="justify-center w-1/6 p-2 mx-auto border border-gray-300"
                />
              </div> */}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 mt-6 text-white bg-whodrivesGrey "
                //le bouton est disabled si les champs ne sont pas remplis
                onClick={() =>
                  handlReturnTripData({
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
        ) : (
          <div className="mx-auto space-x-0 space-y-2 md:flex-row md:space-y-0 md:space-x-4">
            <button
              className="w-full px-4 py-2 mb-4 text-white rounded-md bg-whodrivesGrey md:mb-0 md:w-auto"
              onClick={() => setShowReturn(true)}
            >
              Oui
            </button>
            <button
              className="w-full px-4 py-2 text-white rounded-md bg-whodrivesGrey md:w-auto"
              onClick={() => setSkipReturnTrip()}
            >
              Non
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReturnTrip;
