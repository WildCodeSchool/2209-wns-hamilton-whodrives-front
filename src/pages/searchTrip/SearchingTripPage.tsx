import { useEffect, useRef, useState } from "react";
import SearchTrip from "../../components/shared/SearchTrip";
import "../../styles/searchTrip.css";
import SearchTripResult from "../../components/searchTrip/SearchTripResult";
import { Step, StepLabel, Stepper } from "@mui/material";
import FilterSearchComponent from "../../components/searchTrip/FilterSearchComponent";
import SelectedTrip from "../../components/searchTrip/SelectedTrip";
import { useQuery, gql } from "@apollo/client";
import moment from "moment";
import CongratulationPage from "../../components/shared/CongratulationPage";

interface FormState {
  departure: string;
  arrival: string;
  date: string;
  passenger: string;
}
function SearchingTripPage() {
  const [resultat, setResultat] = useState([]);
  const [tripId, setTripId] = useState();
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

  const {
    loading: loadingTripId,
    error: errorTripId,
    data: dataTripId,
  } = useQuery(GET_TRIP, {
    variables: {
      getTripId: tripId,
    },
  });
  let tab = [
    {
      départ: "Lyon",
      arrivé: "Metz",
      tarif: 20,
      place: 3,
      date: new Date(),
    },
    {
      départ: "Angers",
      arrivé: "Lyon",
      tarif: 10,
      place: 1,
      date: new Date(),
    },
    {
      départ: "Paris",
      arrivé: "Nante",
      tarif: 32,
      place: 4,
      date: new Date(),
    },
  ];
  // form search trip
  const today = new Date().toLocaleDateString("en-us");
  const [form, setForm] = useState<FormState>({
    departure: "départ",
    arrival: "destination",
    date: today,
    passenger: "",
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

  const handleclick = (e: any) => {
    if (form.departure === "départ") {
      setErrorMessage("merci de selectionner une ville de départ");
      setErrorForm(true);
    } else if (form.arrival === "destination") {
      setErrorMessage("merci de selectionner une ville d'arrivée");
      setErrorForm(true);
    } else if (form.date === today) {
      setErrorMessage("merci de selectionner une date de départ");
      setErrorForm(true);
    } else if (form.passenger === "") {
      setErrorMessage("merci de selectionner un nombre de passager");
      setErrorForm(true);
    } else {
      setErrorForm(false);
      setActiveStep(1);
    }
    setActiveStep(1);
    setResultat(data?.getTripSearch);
  };

  //event to choose one trip
  const submitTrip = (e: any) => {
    setActiveStep(2);
  };
  const hoverSetId = (e: any) => {
    setTripId(e.target.value);
    console.log(tripId);
  };
  const stepBack = () => {
    setActiveStep(1);
  };
  const joinTrip = () => {
    setActiveStep(3);
  };
  return (
    <div className="flex h-screen items-center flex-col w-screen">
      <h1 className="text-whodrivesPink mt-10 mb-8">JE CHERCHE UN TRAJET</h1>
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
        <div className="step-1 flex flex-row border-t-2 border-black pt-5">
          <FilterSearchComponent />
          <div className="flex flex-col w-1/1  h-5/6  overflow-auto pl-5 pr-5 pt-0">
            {resultat.map((el: any) => (
              <SearchTripResult
                value={el.id}
                hoverSetId={hoverSetId}
                nameProfil={el.users[0].username}
                date={moment(el.date_departure).format("DD/MM/YYYY")}
                place={el.place_available}
                tarif={el.price}
                hour={(el.hour_departure).split(":00")}
                départ={el.departure_places}
                arrivé={el.destination}
                submitTrip={submitTrip}
              />
            ))}
          </div>
        </div>
      ) : null}
      {activeStep === 2 ? (
        <div className="step-1 flex flex-row">
          <SelectedTrip
            nameProfil="toto"
            départ={dataTripId.getTrip.departure_places}
            arrivée={dataTripId.getTrip.destination}
            place={dataTripId.getTrip.place_available}
            prix={dataTripId.getTrip.price}
            date={moment(dataTripId.getTrip.date_departure).format(
              "DD/MM/YYYY"
            )}
            stepBack={stepBack}
            joinTrip={joinTrip}
          />
        </div>
      ) : null}
      {activeStep === 3 ? <CongratulationPage /> : null}
    </div>
  );
}

export default SearchingTripPage;
