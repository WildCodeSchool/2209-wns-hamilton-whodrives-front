import UserTripsComponent from "../../components/userLogedTrips/UserLogedTrips";

export default function Dashboard(): JSX.Element {
    return (
        <div className="text-center">
            <h1>MON TABLEAU DE BORD</h1>
            <div className=" flex border-2 border-blue-500 p-8 m-20">
                        <UserTripsComponent/>
            </div>
        </div>

 
    )
  }
  