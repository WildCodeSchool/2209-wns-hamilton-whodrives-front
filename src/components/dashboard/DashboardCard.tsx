import React, { useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import moment from "moment";

interface ITrip {
  id: string;
  departure_places: string;
  destination: string;
  date_departure: string;
  arrival_date: string;
  hour_departure: string;
  price: string;
  users: {
    username: string;
  }[];
  passengers: {
    username: string;
  }[];
}

interface IUserTripsData {
  UserTripsLoggedUser: ITrip[];
}

const GET_USER_TRIPS = gql`
  query UserTripsLoggedUser {
    UserTripsLoggedUser {
      id
      departure_places
      destination
      date_departure
      arrival_date
      hour_departure
      price
      users {
        username
      }
      passengers {
        username
      }
    }
  }
`;

const DELETE_TRIP = gql`
  mutation DeleteTrip($deleteTripId: ID!) {
    deleteTrip(id: $deleteTripId) {
      success
      message
    }
  }
`;

const GET_USER_LOGGED_USERNAME = gql`
  query getUserLogged {
    userLogged {
      username
    }
  }
`;

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
            className={`border border-black p-8 flex justify-center m-3 ${
              trip.users.find((user) => user.username === userLogged.username)
                ? "bg-whodrivesGreen text-white"
                : trip.passengers.find(
                    (passenger) => passenger.username === userLogged.username
                  )
                ? "bg-whodrivesPink text-white"
                : ""
            }`}
          >
            <div className="flex flex-col justify-center w-1/3 gap-4 font-bold">
              <div className="flex flex-col font-bold">
                <p>Conducteur :</p>
                {trip.users.map((user) => (
                  <p key={user.username} className="ml-1">
                    {user.username}
                  </p>
                ))}
              </div>
              {trip.users.find(
                (user) => user.username === userLogged.username
              ) ? (
                <div className="flex flex-col font-bold">
                  <p>Passagers :</p>
                  {trip.passengers.map((passenger) => (
                    <p key={passenger.username} className="ml-1 mr-2">
                      {passenger.username}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col justify-center w-2/3 gap-3 font-bold">
              <div className="flex">
                <p className="mr-2">{trip.departure_places}</p>
                <img src="assets/icons/arrow-right-white.svg" alt="" />
                <p className="ml-2">{trip.destination}</p>
              </div>
              <p>
                {moment(trip.date_departure).format("DD/MM/YYYY")} -{" "}
                {trip.hour_departure.split(":00")}
              </p>
              <p>Prix : {trip.price} €</p>
            </div>
            <div className="w-1/5">
              <button
                type="submit"
                className="p-4"
                onClick={() => handleDeleteTrip(trip.id)}
              >
                <p className="p-2 text-xs red-button">
                  {trip.users.find(
                    (user) => user.username === userLogged.username
                  )
                    ? "Supprimer ce trajet"
                    : trip.passengers.find(
                        (passenger) =>
                          passenger.username === userLogged.username
                      )
                    ? "Quitter ce trajet"
                    : ""}
                </p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
