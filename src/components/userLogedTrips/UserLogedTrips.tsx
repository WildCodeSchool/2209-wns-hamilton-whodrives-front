import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_USER_TRIPS = gql`
  query UserTripsLoggedUser {
    UserTripsLoggedUser {
      id
      departure_places
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

const GET_USER_LOGGED = gql`
  query getUserLogged {
    userLogged {
      username
    }
  }
`;

const UserTripsComponent = () => {
  const token = localStorage.getItem("token");

  const {
    loading: tripsLoading,
    error: tripsError,
    data: tripsData,
  } = useQuery(GET_USER_TRIPS, {
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
  } = useQuery(GET_USER_LOGGED, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

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

  const trips = tripsData.UserTripsLoggedUser;
  const userLogged = userData.userLogged;

  return (
    <div className="flex flex-col flex-grow">
      {trips.map((trip: any) => (
        <div
          key={trip.id}
          className={`border border-gray-300 rounded p-4 flex flex-wrap justify-center m-3 ${
            trip.users.find(
              (user: any) => user.username === userLogged.username
            )
              ? "bg-green-400 text-white"
              : trip.passengers.find(
                  (passenger: any) => passenger.username === userLogged.username
                )
              ? "bg-red-400 text-white"
              : ""
          }`}
        >
          <div className="flex items-center">
            <p className="m-3 font-bold">{trip.date_departure}</p>
            <p className="m-3 font-bold">{trip.hour_departure.split(":00")}</p>
            <p className="m-3 font-bold">{trip.departure_places}</p>
            <img src="assets/icons/arrow-right-white.svg" alt="" />
          </div>
          <p className="m-3 font-bold text-center">{trip.destination}</p>
          <div className="flex flex-wrap justify-end">
            {trip.users
              .filter((user: any) => user.username === userLogged.username)
              .map((user: any) => (
                <p key={user.username} className="m-3 mr-2 font-bold">
                  {user.username}
                </p>
              ))}
            {trip.passengers
              .filter(
                (passenger: any) => passenger.username === userLogged.username
              )
              .map((passenger: any) => (
                <p key={passenger.username} className="m-3 mr-2 font-bold">
                  {passenger.username}
                </p>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserTripsComponent;
