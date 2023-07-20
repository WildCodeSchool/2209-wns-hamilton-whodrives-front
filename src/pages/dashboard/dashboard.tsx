import UserTripsComponent from "../../components/userLogedTrips/UserLogedTrips";

export default function Dashboard(): JSX.Element {
  return (
    <div className="text-center">
      <h1>MON TABLEAU DE BORD</h1>
      <div className="flex p-8 m-20 border-2 border-blue-500 ">
        <UserTripsComponent />
      </div>
    </div>
  );
}
