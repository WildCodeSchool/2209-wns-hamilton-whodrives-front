export default interface ITrip {
  id: string;
  departure_places: string;
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
