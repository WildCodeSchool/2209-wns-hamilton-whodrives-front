import { useState } from "react";
import "../../styles/createTrip.css";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import moment from "moment";

function PublishTrip({ trip, returnTrip }: any) {
  const CREATE_TRIP_MUTATION = gql`
    mutation CreateTrip(
      $departurePlaces: String
      $destination: String
      $dateDeparture: Date
      $arrivalDate: Date
      $price: Int
      $description: String
      $hourDeparture: String
      $placeAvailable: Int
    ) {
      createTrip(
        departure_places: $departurePlaces
        destination: $destination
        date_departure: $dateDeparture
        arrival_date: $arrivalDate
        price: $price
        description: $description
        hour_departure: $hourDeparture
        place_available: $placeAvailable
      ) {
        id
        departure_places
        destination
        date_departure
        arrival_date
        price
        description
        hour_departure
        place_available
      }
    }
  `;

  const locationField = {
    departure: trip.departure,
    arrival: trip.arrival,
    date: trip.date,
    time: trip.time,
    passengers: trip.passengers,
    price: trip.price,
    description: trip.description,
  };

  const trips = [locationField];

  const [publishTrip, setPublishTrip] = useState(false);
  const navigate = useNavigate();
  const [createTrip] = useMutation(CREATE_TRIP_MUTATION);

  const handlePublishTrip = async () => {
    try {
      const formattedDate = moment(locationField.date, 'YYYY-MM-DD', true);
      if (!formattedDate.isValid()) {
        throw new Error("La valeur de date est invalide.");
      }
  
      const formattedTime = moment(locationField.time, 'HH:mm', true);
      if (!formattedTime.isValid()) {
        throw new Error("La valeur de l'heure est invalide.");
      }
  
      const { data } = await createTrip({
        variables: {
          departurePlaces: locationField.departure,
          destination: locationField.arrival,
          dateDeparture: formattedDate.isValid() ? formattedDate.format('YYYY-MM-DD') : null,
          arrivalDate: formattedDate.isValid() ? formattedDate.format('YYYY-MM-DD') : null,
          price: locationField.price,
          description: locationField.description,
          hourDeparture: formattedTime.isValid() ? formattedTime.format('HH:mm:ss') : null,
          placeAvailable: locationField.passengers,
        },
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la publication de l'annonce :", error);
    }
  };

return (
  <div className="flex flex-col items-center">
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-xl mb-4">
      <h1 className="text-2xl font-semibold mb-4">
        Récapitulatif de votre annonce
      </h1>
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
