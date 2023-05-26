import { useEffect, useState } from "react";
import { useLocation, useNavigate  } from 'react-router-dom';

function ConfirmTrip({trip, handleConfirmTripData,BackToFirstStage}:any) {

  useEffect(() => {
    ifTripDataIsComplete();
    }, []);
    

  function ifTripDataIsComplete() {
    if (trip.price && trip.description) {
      setPrice(trip.price);
      setDescription(trip.description);
    
    }
  } 

  const [price, setPrice] = useState<number>(50);
  const [description, setDescription] = useState<string>("")

  const LocationField = {
    departure: trip.departure,
    arrival: trip.arrival,
    date: trip.date,
    time: trip.time,
    passengers: trip.passengers,
    price: trip.price,
    description: trip.description,
    
  }
  const handlePriceChange = (event: any) => {
    setPrice(parseInt(event.target.value));
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="mx-auto sm:w-3/5 lg:w-2/5 xl:w-1/5">
        <h2 className="text-lg font-semibold mb-4 text-center">Mon trajet</h2>
        <div className="flex flex-wrap items-center justify-center space-x-2 mb-4">
          <span className="font-semibold">{LocationField.departure}</span>
          <span>&rarr;</span>
          <span className="font-semibold">{LocationField.arrival}</span>
          <span className="mx-2">|</span>
          <span>{LocationField.date}</span>
          <span className="mx-2">-</span>
          <span>{LocationField.time}</span>
          <span className="mx-2">|</span>
          <span>{LocationField.passengers} passagers</span>
        </div>
        <div className="flex items-center mb-4 justify-center">
          <button
            className="bg-gray-200 text-gray-500 rounded-full px-2 py-1 mr-2"
            onClick={() => setPrice(Math.max(0, price - 20))}
          >
            -
          </button>
          <input
            type="number"
            value={price}
            onChange={handlePriceChange}
            className="w-16 text-center"
          />
          <button
            className="bg-gray-200 text-gray-500 rounded-full px-2 py-1 ml-2"
            onClick={() => setPrice(price + 10)}
          >
            +
          </button>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="commentaire">Commentaire</label>
          <textarea
            id="commentaire"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="text-center">
          <button
           className="bg-whodrivesGrey text-white py-2 px-4 rounded-md mr-2"
           onClick={() => BackToFirstStage() }>
            retour
          </button>
          <button
          type="submit"
          className="bg-whodrivesGrey text-white py-2 px-4 rounded-md"
          onClick={() => handleConfirmTripData({price, description})}>
            suivant
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmTrip;
