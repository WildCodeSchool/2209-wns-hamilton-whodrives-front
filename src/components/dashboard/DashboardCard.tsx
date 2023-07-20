import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { useEffect } from "react";

import ITrip from "../../interfaces/IDashboard";
import { DELETE_TRIP } from "../../queryMutation/mutations";
import {
  GET_USER_LOGGED_USERNAME,
  GET_USER_TRIPS,
} from "../../queryMutation/query";

interface IUserTripsData {
  UserTripsLoggedUser: ITrip[];
}

export default function DashboardCard() {
  const {
    loading: tripsLoading,
    error: tripsError,
    data: tripsData,
    refetch,
  } = useQuery<IUserTripsData>(GET_USER_TRIPS);
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USER_LOGGED_USERNAME);

  const [deleteTripMutation] = useMutation(DELETE_TRIP);

  useEffect(() => {
    if (tripsError) {
      console.error(
        "Une erreur s'est produite lors de la récupération des voyages de l'utilisateur:",
        tripsError
      );
    }
    if (userError) {
      console.error(
        "Une erreur s'est produite lors de la récupération de l'utilisateur connecté:",
        userError
      );
    }
  }, [tripsError, userError]);

  useEffect(() => {
    refetch();
  }, []);

  //   if (tripsLoading || userLoading) {
  //     return <p>Chargement en cours de chargement...</p>;
  //   }

  if (tripsError || userError) {
    return (
      <p>
        Une erreur s'est produite lors du chargement des voyages de
        l'utilisateur.
      </p>
    );
  }

  const trips = tripsData?.UserTripsLoggedUser || [];
  const userLogged = userData?.userLogged || { username: "" };

  const handleDeleteTrip = (tripId: string) => {
    deleteTripMutation({
      variables: { deleteTripId: tripId },
      update: (cache) => {
        const existingTrips = cache.readQuery<IUserTripsData>({
          query: GET_USER_TRIPS,
        });

        if (existingTrips) {
          const updatedTrips = existingTrips.UserTripsLoggedUser.filter(
            (trip) => trip.id !== tripId
          );

          cache.writeQuery<IUserTripsData>({
            query: GET_USER_TRIPS,
            data: { UserTripsLoggedUser: updatedTrips },
          });
        }
      },
    })
      .then(() => {
        // Optional: Do something after successful deletion if needed.
      })
      .catch((error) => {
        // Handle any errors that occur during the mutation (e.g., show an error message).
        console.error("An error occurred during trip deletion:", error);
      });
  };
  return (
    <div className="flex flex-col w-5/6 p-8 m-auto my-4 border-2 md:flex-row md:w-1/2 border-validBlue">
      <div className="flex flex-col flex-grow">
        {trips.map((trip: ITrip) => (
          <div
            key={trip.id}
            className={`border border-black p-4 flex flex-wrap justify-center m-3 ${
              trip.users.find((user) => user.username === userLogged.username)
                ? "bg-whodrivesGreen text-white"
                : trip.passengers.find(
                    (passenger) => passenger.username === userLogged.username
                  )
                ? "bg-whodrivesPink text-white"
                : ""
            }`}
          >
            <div className="flex items-center">
              <p className="m-3 font-bold">
                {moment(trip.date_departure).format("DD/MM/YYYY")}
              </p>
              <p className="m-3 font-bold">
                {trip.hour_departure.split(":00")}
              </p>
              <p className="m-3 font-bold">{trip.departure_places}</p>
              <img src="assets/icons/arrow-right-white.svg" alt="" />
            </div>
            <p className="m-3 font-bold text-center">{trip.destination}</p>
            <div className="flex flex-wrap justify-end">
              {trip.users.map((user) => (
                <p key={user.username} className="m-3 mr-2 font-bold">
                  {user.username}
                </p>
              ))}
            </div>

            {trip.users.find(
              (user) => user.username === userLogged.username
            ) ? (
              <p className="flex m-3 font-bold">
                Passagers:
                {trip.passengers.map((passenger) => (
                  <p key={passenger.username} className="ml-2 mr-2 font-bold ">
                    {passenger.username}
                  </p>
                ))}
              </p>
            ) : null}
            <button onClick={() => handleDeleteTrip(trip.id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
}
