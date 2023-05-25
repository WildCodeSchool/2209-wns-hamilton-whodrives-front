import { useState } from "react";
import ConfirmTrip from "./ConfirmTrip";
import  "../../styles/createTrip.css";
import { useNavigate } from 'react-router-dom';

function PublishTrip({trip, returnTrip}:any) {

  const locationField = {
    departure: trip.departure,
    arrival: trip.arrival,
    date: trip.date,
    time: trip.time,
    passengers: trip.passengers,
    price: trip.price,
    description: trip.description,
  };

  const returnLocationField = {
    departure: returnTrip.departure,
    arrival: returnTrip.arrival,
    date: returnTrip.date,
    time: returnTrip.time,
    passengers: returnTrip.passengers,
    price: returnTrip.price,
    description: returnTrip.description,
  };

  const trips = [locationField];

  if (returnLocationField.departure && returnLocationField.arrival) {
    trips.push(returnLocationField);
  }

  const [publishTrip, setPublishTrip] = useState<boolean>(false);
  const navigate = useNavigate();

  const handlePublishTrip = () => {
    setPublishTrip(true);
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-xl mb-4">
        <h1 className="text-2xl font-semibold mb-4">Récapitulatif de votre annonce</h1>
        <div className="space-y-4">
          {trips.map((locationField, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Trajet {index + 1}</h2>
              <div className="flex items-center mb-2">
                <span className="text-gray-500">Départ :</span>
                <span className="ml-2">{locationField.departure}</span>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-gray-500">Arrivée :</span>
                <span className="ml-2">{locationField.arrival}</span>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-gray-500">Date :</span>
                <span className="ml-2">{locationField.date}</span>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-gray-500">Heure :</span>
                <span className="ml-2">{locationField.time}</span>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-gray-500">Prix :</span>
                <span className="ml-2">{locationField.price}€</span>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-gray-500">Nombre de passagers :</span>
                <span className="ml-2">{locationField.passengers}</span>
              </div>
              {locationField.description && (
                <div className="flex items-center mb-2">
                  <span className="text-gray-500">Commentaire :</span>
                  <span className="ml-2">{locationField.description}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handlePublishTrip}
      >
        Publier l'annonce
      </button>
    </div>
  );
  
}

export default PublishTrip;
