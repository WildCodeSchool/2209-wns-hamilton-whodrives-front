import React, { useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

interface Trip {
  id: string;
  departure_place: string;
  destination: string;
  date_departure: string;
  arrival_date: string;
  hour_departure: string;
  users: {
    username: string;
  }[];
  passengers: {
    username: string;
  }[];
}

interface UserTripsData {
  UserTripsLoggedUser: Trip[];
}

const GET_USER_TRIPS = gql`
  query UserTripsLoggedUser {
    UserTripsLoggedUser {
      id
      departure_place
      destination
      date_departure
      arrival_date
      hour_departure
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

const GET_USER_LOGGED = gql`
  query getUserLogged {
    userLogged {
      username
    }
  }
`;

const UserTripsComponent: React.FC = () => {
  const token = localStorage.getItem("token");

  const {
    loading: tripsLoading,
    error: tripsError,
    data: tripsData,
  } = useQuery<UserTripsData>(GET_USER_TRIPS, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USER_LOGGED);

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
  if (tripsLoading || userLoading) {
    return <p>Chargement en cours...</p>;
  }
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
        const existingTrips = cache.readQuery<UserTripsData>({
          query: GET_USER_TRIPS,
        });

        if (existingTrips) {
          const updatedTrips = existingTrips.UserTripsLoggedUser.filter(
            (trip) => trip.id !== tripId
          );

          cache.writeQuery<UserTripsData>({
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
    <div className="flex flex-col flex-grow">
      {trips.map((trip: Trip) => (
        <div
          key={trip.id}
          className={`border border-gray-300 rounded p-4 flex flex-wrap justify-center m-3 ${
            trip.users.find((user) => user.username === userLogged.username)
              ? "bg-green-400 text-white"
              : trip.passengers.find(
                  (passenger) => passenger.username === userLogged.username
                )
              ? "bg-red-400 text-white"
              : ""
          }`}
        >
          <div className="flex items-center">
            <p className="m-3 font-bold">{trip.date_departure}</p>
            <p className="m-3 font-bold">{trip.hour_departure.split(":00")}</p>
            <p className="m-3 font-bold">{trip.departure_place}</p>
            <img src="assets/icons/arrow-right-white.svg" alt="" />
          </div>
          <p className="m-3 font-bold text-center">{trip.destination}</p>
          <div className="flex flex-wrap justify-end">
            {trip.users
              .filter((user) => user.username === userLogged.username)
              .map((user) => (
                <p key={user.username} className="m-3 mr-2 font-bold">
                  {user.username}
                </p>
              ))}
            {trip.passengers
              .filter((passenger) => passenger.username === userLogged.username)
              .map((passenger) => (
                <p key={passenger.username} className="m-3 mr-2 font-bold">
                  {/* {passenger.username} */}
                </p>
              ))}
          </div>

          {trip.users.find((user) => user.username === userLogged.username) ? (
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
  );
};

export default UserTripsComponent;
