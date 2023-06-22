import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

function PublishTrip({ trip, returnTrip }: any) {
  const CreateTrip = gql`
    mutation CreateTrip(
      $departurePlaces: String
      $destination: String
      $dateDeparture: Timestamp
      $arrivalDate: Timestamp
      $hourDeparture: Timestamp
    ) {
      createTrip(
        departure_places: $departurePlaces
        destination: $destination
        date_departure: $dateDeparture
        arrival_date: $arrivalDate
        hour_departure: $hourDeparture
      ) {
        id
        departure_places
        destination
        date_departure
        arrival_date
        hour_departure
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
  const [createTrip] = useMutation(CreateTrip);

  const handlePublishTrip = async () => {
    let date = locationField.date;
    let dateSplit = date.split("-");
    let time = locationField.time;
    let timeSplit = time.split(":");

    let newDate = new Date();
    newDate.setHours(+timeSplit[0] + 2, +timeSplit[1]);
    newDate.setFullYear(+dateSplit[0], +dateSplit[1] - 1, +dateSplit[2]);

    try {
      const { data } = await createTrip({
        variables: {
          departurePlaces: locationField.departure,
          destination: locationField.arrival,
          dateDeparture: newDate.getTime(),
          arrivalDate: newDate.getTime(),
          hourDeparture: newDate.getTime(),
        },
      });

      // Naviguer vers une autre page après publication
      navigate("/nouvelle-page");
    } catch (error) {
      console.error("Erreur lors de la publication de l'annonce :", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xl p-4 mb-4 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-semibold">
          Récapitulatif de votre annonce
        </h1>
        <div className="space-y-4">
          {trips.map((locationField, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg">
              <h2 className="mb-2 text-lg font-semibold">Trajet {index + 1}</h2>
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
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
        onClick={handlePublishTrip}
      >
        Publier l'annonce
      </button>
    </div>
  );
}

export default PublishTrip;
