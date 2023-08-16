import { gql, useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { useEffect } from "react";

interface ITrip {
  id: string;
  departure_place: string;
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
  getUserTripsLoggedUser: ITrip[];
}
const GET_USER_TRIPS = gql`
  query getUserTripsLoggedUser {
    getUserTripsLoggedUser {
      id
      departure_place
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
    getUserLogged {
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
  const trips = tripsData?.getUserTripsLoggedUser || [];
  const getUserLogged = userData?.getUserLogged || { username: "" };
  const handleDeleteTrip = (tripId: string) => {
    deleteTripMutation({
      variables: { deleteTripId: tripId },
      update: (cache) => {
        const existingTrips = cache.readQuery<IUserTripsData>({
          query: GET_USER_TRIPS,
        });
        if (existingTrips) {
          const updatedTrips = existingTrips.getUserTripsLoggedUser.filter(
            (trip) => trip.id !== tripId
          );
          cache.writeQuery<IUserTripsData>({
            query: GET_USER_TRIPS,
            data: { getUserTripsLoggedUser: updatedTrips },
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
      <div className="w-full">
        {trips.map((trip: ITrip) => (
          <div
            key={trip.id}
            className={`border border-black p-4 md:p-8 flex flex-col md:flex-row justify-center mb-6 md:m-3 ${
              trip.users.find(
                (user) => user.username === getUserLogged.username
              )
                ? "bg-whodrivesGreen text-white"
                : trip.passengers.find(
                    (passenger) => passenger.username === getUserLogged.username
                  )
                ? "bg-whodrivesPink text-white"
                : ""
            }`}
          >
            <div className="flex flex-col">
              <h3 className="mb-4 text-center">Votre trajet</h3>
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col items-center justify-center w-full gap-2 mb-4 font-bold md:mb-0 md:gap-4 md:w-1/5">
                  <div className="flex flex-col font-bold">
                    <p>Conducteur :</p>
                    {trip.users.map((user) => (
                      <p key={user.username} className="ml-2">
                        {user.username}
                      </p>
                    ))}
                  </div>
                  {trip.users.find(
                    (user) => user.username === getUserLogged.username
                  ) ? (
                    <div className="flex flex-col font-bold">
                      <p>Passagers :</p>
                      {trip.passengers.map((passenger) => (
                        <p key={passenger.username} className="ml-2">
                          {passenger.username}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-3 font-bold md:w-3/5">
                  <div className="hidden md:flex">
                    <p>{trip.departure_place}</p>
                    <img
                      src="assets/icons/arrow-right-white.svg"
                      alt=""
                      className="mx-2"
                    />
                    <p>{trip.destination}</p>
                  </div>
                  <div className="flex flex-col text-center md:hidden">
                    <p>{trip.departure_place}</p>
                    <img
                      src="assets/icons/arrow-down-white.svg"
                      alt=""
                      className="my-2"
                    />
                    <p>{trip.destination}</p>
                  </div>
                  <p>
                    {moment(trip.date_departure).format("DD/MM/YYYY")} -{" "}
                    {trip.hour_departure.split(":00")}
                  </p>
                  <p>Prix : {trip.price} €</p>
                </div>
                <div className="w-full md:w-1/5">
                  <button
                    type="submit"
                    className="p-4"
                    onClick={() => handleDeleteTrip(trip.id)}
                  >
                    <p className="p-2 text-xs red-button">
                      {trip.users.find(
                        (user) => user.username === getUserLogged.username
                      )
                        ? "Supprimer ce trajet"
                        : trip.passengers.find(
                            (passenger) =>
                              passenger.username === getUserLogged.username
                          )
                        ? "Quitter ce trajet"
                        : ""}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
