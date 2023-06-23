import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_USER_TRIPS = gql`
  query UserTripsLoggedUser {
    UserTripsLoggedUser {
      id
      departure_places
      destination
      date_departure
      arrival_date
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
  const token = localStorage.getItem('token');

  const { loading: tripsLoading, error: tripsError, data: tripsData } = useQuery(GET_USER_TRIPS, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_LOGGED, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  useEffect(() => {
    if (tripsError) {
      console.error('Une erreur s\'est produite lors de la récupération des voyages de l\'utilisateur:', tripsError);
    }
    if (userError) {
      console.error('Une erreur s\'est produite lors de la récupération de l\'utilisateur connecté:', userError);
    }
  }, [tripsError, userError]);

  if (tripsLoading || userLoading) {
    return <p>Chargement en cours...</p>;
  }

  if (tripsError || userError) {
    return <p>Une erreur s'est produite lors du chargement des voyages de l'utilisateur.</p>;
  }

  const trips = tripsData.UserTripsLoggedUser;
  const userLogged = userData.userLogged;

  const formatTimestampToDate = (timestamp: number) => {
    const dateObj = new Date(timestamp);
    const day = dateObj.getUTCDate().toString().padStart(2, '0');
    const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getUTCFullYear();
    const hours = dateObj.getUTCHours().toString().padStart(2, '0');
    const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="flex flex-col flex-grow">
      {trips.map((trip: any) => (
        <div
          key={trip.id}
          className={`border border-gray-300 rounded p-4 flex flex-wrap justify-center m-3 ${
            trip.users.find((user: any) => user.username === userLogged.username)
              ? 'bg-green-400 text-white'
              : trip.passengers.find((passenger: any) => passenger.username === userLogged.username)
              ? 'bg-red-400 text-white'
              : ''
          }`}
        >
          <div className="flex items-center">
            <p className="font-bold m-3">{formatTimestampToDate(trip.date_departure)}</p>
            <p className="font-bold m-3">{trip.departure_places}</p>
            <img src="assets/icons/arrow-right-white.svg" alt="" />
          </div>
          <p className="font-bold m-3 text-center">{trip.destination}</p>
          <div className="flex flex-wrap justify-end">
            {trip.users
              .filter((user: any) => user.username === userLogged.username)
              .map((user: any) => (
                <p key={user.username} className="mr-2 font-bold m-3">
                  {user.username}
                </p>
              ))}
            {trip.passengers
              .filter((passenger: any) => passenger.username === userLogged.username)
              .map((passenger: any) => (
                <p key={passenger.username} className="mr-2 font-bold m-3">
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