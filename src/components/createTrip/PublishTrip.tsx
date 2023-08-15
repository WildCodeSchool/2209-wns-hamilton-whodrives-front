import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import moment from "moment";
function PublishTrip({ trip, returnTrip, BackToPreviousStage }: any) {
  const CREATE_TRIP_MUTATION = gql`
    mutation CreateTrip(
      $departurePlace: String
      $destination: String
      $dateDeparture: Date
      $arrivalDate: Date
      $price: Int
      $description: String
      $hourDeparture: String
      $placeAvailable: Int
    ) {
      createTrip(
        departure_place: $departurePlace
        destination: $destination
        date_departure: $dateDeparture
        arrival_date: $arrivalDate
        price: $price
        description: $description
        hour_departure: $hourDeparture
        available_seat: $placeAvailable
      ) {
        id
        departure_place
        destination
        date_departure
        arrival_date
        price
        description
        hour_departure
        available_seat
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
  const navigate = useNavigate();
  const [createTrip] = useMutation(CREATE_TRIP_MUTATION);
  const handlePublishTrip = async () => {
    try {
      const formattedDate = moment(locationField.date, "YYYY-MM-DD", true);
      if (!formattedDate.isValid()) {
        throw new Error("La valeur de date est invalide.");
      }
      const formattedTime = moment(locationField.time, "HH:mm", true);
      if (!formattedTime.isValid()) {
        throw new Error("La valeur de l'heure est invalide.");
      }

      const { data } = await createTrip({
        variables: {
          departurePlace: locationField.departure,
          destination: locationField.arrival,
          dateDeparture: formattedDate.isValid()
            ? formattedDate.format("YYYY-MM-DD")
            : null,
          arrivalDate: formattedDate.isValid()
            ? formattedDate.format("YYYY-MM-DD")
            : null,
          price: locationField.price,
          description: locationField.description,
          hourDeparture: formattedTime.isValid()
            ? formattedTime.format("HH:mm:ss")
            : null,
          placeAvailable: locationField.passengers,
        },
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la publication de l'annonce :", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center py-5">
      <div className="w-3/5 p-4 mb-4 bg-white border-2 lg:w-2/5 border-validBlue">
        <h3 className="mb-4 text-center text-validBlue">
          Récapitulatif de votre annonce
        </h3>
        <div className="space-y-4">
          {trips.map((locationField, index) => (
            <div key={index} className="p-4 bg-gray-100">
              <div className="flex justify-center mb-2">
                <span className="text-gray-500">Départ :</span>
                <span className="ml-2">{locationField.departure}</span>
              </div>
              <div className="flex justify-center mb-2">
                <span className="text-gray-500">Arrivée :</span>
                <span className="ml-2">{locationField.arrival}</span>
              </div>
              <div className="flex justify-center mb-2">
                <span className="text-gray-500">Date :</span>
                <span className="ml-2">{locationField.date}</span>
              </div>
              <div className="flex justify-center mb-2">
                <span className="text-gray-500">Heure :</span>
                <span className="ml-2">{locationField.time}</span>
              </div>
              <div className="flex justify-center mb-2">
                <span className="text-gray-500">Prix :</span>
                <span className="ml-2">{locationField.price}€</span>
              </div>
              <div className="flex justify-center mb-2">
                <span className="text-gray-500">Nombre de passagers :</span>
                <span className="ml-2">{locationField.passengers}</span>
              </div>
              {locationField.description && (
                <div className="flex justify-center mb-2">
                  <span className="text-gray-500">Commentaire :</span>
                  <span className="ml-2">{locationField.description}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <button className="p-4" onClick={() => BackToPreviousStage()}>
          <p className="font-bold text-whodrivesGrey hover:text-validBlue">
            Retour
          </p>
        </button>
        <button className="p-4" onClick={handlePublishTrip}>
          <p className="p-2 text-xs green-button">Publier l'annonce</p>
        </button>
      </div>
    </div>
  );
}
export default PublishTrip;
