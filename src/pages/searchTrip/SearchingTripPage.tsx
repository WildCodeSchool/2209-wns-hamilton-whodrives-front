import { useState } from "react";
import SearchTrip from "../../components/shared/SearchTrip";
import "../../styles/searchTrip.css";
import SearchTripResult from "../../components/searchTrip/SearchTripResult";
import { Step, StepLabel, Stepper } from "@mui/material";
import FilterSearchComponent from "../../components/searchTrip/FilterSearchComponent";
import SelectedTrip from "../../components/searchTrip/SelectedTrip";
import { useQuery, gql, useMutation } from "@apollo/client";
import moment from "moment";
import CongratulationPage from "../../components/shared/CongratulationPage";

interface FormState {
  departure: string;
  arrival: string;
  date: string;
  passenger: number;
}
interface Trip {
  id: number;
  users: User[];
  place_available: number;
  price: number;
  date_departure: string;
  hour_departure: string;
  departure_places: string;
  destination: string;
}

interface User {
  username: string;
}
function SearchingTripPage() {
  const [resultat, setResultat] = useState([]);
  const [tripId, setTripId] = useState("");
  //Query gql
  const GET_TRIP_SEARCH = gql`
    query GetTripSearch(
      $departurePlaces: String
      $destination: String
      $dateDeparture: Date
    ) {
      getTripSearch(
        departure_places: $departurePlaces
        destination: $destination
        date_departure: $dateDeparture
      ) {
        id
        departure_places
        date_departure
        hour_departure
        destination
        place_available
        price
        users {
          username
        }
      }
    }
  `;
  const GET_TRIP = gql`
    query GetTrip($getTripId: ID!) {
      getTrip(id: $getTripId) {
        id
        departure_places
        destination
        date_departure
        place_available
        hour_departure
        arrival_date
        price
        description
        users {
          username
        }
      }
    }
  `;
  const SELECT_TRIP = gql`
    mutation SelectTrip($tripId: ID!) {
      selectTrip(tripId: $tripId) {
        id
      }
    }
  `;

  const [selectTrip] = useMutation(SELECT_TRIP);

  const {
    loading: loadingTripId,
    error: errorTripId,
    data: dataTripId,
  } = useQuery(GET_TRIP, {
    variables: {
      getTripId: tripId,
    },
  });

  // form search trip
  const today = new Date().toLocaleDateString("en-us");
  const [form, setForm] = useState<FormState>({
    departure: "départ",
    arrival: "destination",
    date: today,
    passenger: 0,
  });
  let [errorMessage, setErrorMessage] = useState("");
  const [errorForm, setErrorForm] = useState(false);

  const { loading, error, data } = useQuery(GET_TRIP_SEARCH, {
    variables: {
      departurePlaces: form.departure,
      destination: form.arrival,
      dateDeparture: form.date,
    },
  });

  //installation stepper
  const steps = [
    "RECHERCHER VOTRE TRAJET",
    "SELECTIONNER UN TRAJET",
    "VALIDER VOTRE PROJET",
    "FELICITATION",
  ];
  const [activeStep, setActiveStep] = useState(0);

  //event to retrieve trips

  const handleclick = () => {
    if (form.departure === "départ") {
      setErrorMessage("merci de selectionner une ville de départ");
      setErrorForm(true);
    } else if (form.arrival === "destination") {
      setErrorMessage("merci de selectionner une ville d'arrivée");
      setErrorForm(true);
    } else if (form.date === today) {
      setErrorMessage("merci de selectionner une date de départ");
      setErrorForm(true);
    } else {
      setErrorForm(false);
      setActiveStep(1);
    }
    setActiveStep(1);

    setResultat(data?.getTripSearch);
  };

  //event to choose one trip
  const submitTrip = () => {
    setActiveStep(2);
  };
  const hoverSetId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTripId(e.target.value);
  };
  const stepBack = () => {
    setActiveStep(1);
  };
  const joinTrip = () => {
    selectTrip({ variables: { tripId } })
      .then((response) => {
       
      })
      .catch((error) => {
       
      });
    setActiveStep(3);
  };
  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <h1 className="mt-10 mb-8 text-whodrivesPink">JE CHERCHE UN TRAJET</h1>
      {activeStep !== 3 ? (
        <Stepper activeStep={activeStep} className="mb-12">
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
      ) : null}
      {activeStep !== 2 && activeStep !== 3 ? (
        <SearchTrip
          onclick={handleclick}
          form={form}
          setForm={setForm}
          today={today}
        />
      ) : null}
      {errorForm && <p className="text-red-600">{errorMessage}</p>}
      {activeStep === 1 ? (
        <div className="flex flex-row pt-5 border-t-2 border-black step-1">
          <FilterSearchComponent />
          <div className="flex flex-col pt-0 pl-5 pr-5 overflow-auto w-1/1 h-5/6">
            {resultat.map((el: Trip) =>
              el.place_available >= form.passenger ? (
                <SearchTripResult
                  value={el.id}
                  hoverSetId={hoverSetId}
                  nameProfil={el.users[0].username}
                  date={moment(el.date_departure).format("DD/MM/YYYY")}
                  seats={el.place_available}
                  price={el.price}
                  hour={el.hour_departure.split(":00")}
                  departure={el.departure_places}
                  arrival={el.destination}
                  submitTrip={submitTrip}
                />
              ) : (
                <div>aucun trajet ne correspond a votre recherche</div>
              )
            )}
          </div>
        </div>
      ) : null}
      {activeStep === 2 ? (
        <div className="flex flex-row step-1">
          <SelectedTrip
            passenger={dataTripId.getTrip.passenger}
            nameProfil="toto"
            departure={dataTripId.getTrip.departure_places}
            arrival={dataTripId.getTrip.destination}
            seats={dataTripId.getTrip.place_available}
            price={dataTripId.getTrip.price}
            hour={dataTripId.getTrip.hour_departure}
            date={moment(dataTripId.getTrip.date_departure).format(
              "DD/MM/YYYY"
            )}
            stepBack={stepBack}
            joinTrip={joinTrip}
          />
        </div>
      ) : null}
      {activeStep === 3 ? <CongratulationPage  messageCongrats="VOUS AVEZ REJOINT LE TRAJET"/> : null}
    </div>
  );
}

export default SearchingTripPage;
