import { useQuery, gql } from "@apollo/client";

const GET_USERS_TRIPS = gql`
  query GetTrips {
    getTrips {
      id
      departure_places
      destination
      date_departure
      arrival_date
      hour_departure
    }
  }
`;

const HomeComponent = () => {
  const { loading, error, data } = useQuery(GET_USERS_TRIPS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {data.getTrips.map((trip: any) => (
        <div key={trip.id}>
          <h3>Trip ID: {trip.id}</h3>
          <p>Departure Places: {trip.departure_places}</p>
          <p>Destination: {trip.destination}</p>
          <p>Date of Departure: {trip.date_departure}</p>
          <p>Arrival Date: {trip.arrival_date}</p>
          <p>Departure Hour: {trip.hour_departure}</p>
        </div>
      ))}
    </div>
  );
};

export default HomeComponent;
