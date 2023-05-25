import { useState } from "react";

function ReturnTrip({trip, setNexStep, handleConfirmreturnTripData}:any) {
  
  const [showReturn, setShowReturn] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers ] = useState("");
  const [price, setPrice] = useState("");

  const locationField = {
    departure: trip.departure,
    arrival: trip.arrival,
  }

  const returnTrip = {
    date: date,
    heure: time,
    passengers: passengers,
    price: price,
    departure: trip.arrival, // on inverse le départ et l'arrivée pour le trajet retour
    arrival: trip.departure,
    description : trip.description,
  }

  const handlePriceChange = (e: any) => {
    setPrice(e.target.value);
  };


  return (
    <div className="h-screen flex flex-col justify-center items-center">
    <div className="mx-auto w-4/5 md:w-2/5 lg:w-1/5 text-center">
      <h2 className="text-lg font-semibold mb-4">Voulez-vous préparer un trajet retour ?</h2>
      {showReturn ? (
        <div className="mb-4">
          <span className="font-semibold">{locationField.arrival}</span>
          <span>&rarr;</span>
          <span className="font-semibold">{locationField.departure}</span>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <div className="flex flex-col space-y-2 md:w-1/2">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col space-y-2 md:w-1/2">
              <label htmlFor="heure">Heure</label>
              <input
                type="time"
                id="heure"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="nombrePersonnes">Nombre de personnes</label>
            <input
              type="number"
              id="nombrePersonnes"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-1/6 mx-auto"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="price">Prix</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={handlePriceChange}
              className="border border-gray-300 rounded-md p-2 w-1/6 mx-auto"
            />
          </div>

          <div className="text-center">
            <button 
            onClick={() => handleConfirmreturnTripData({departure: trip.arrival, arrival: trip.departure, price : price, date: date, time: time, passengers: passengers, description: trip.description})}
            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4">
              Publier
            </button>
            <button 
            onClick={() => setNexStep()}
            className="bg-gray-200 text-gray-500 py-2 px-4 rounded-md mt-4 ml-4">
              Annuler
            </button>
          </div>
        </div>
  
      ) : (
        <div className="mx-auto  md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-4 mx-auto">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 md:mb-0 w-full md:w-auto"
          onClick={() => setShowReturn(true)}
        >
          Oui
        </button>
        <button
          className="bg-gray-200 text-gray-500 py-2 px-4 rounded-md w-full md:w-auto"
          onClick={() => setNexStep()}
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
