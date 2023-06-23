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

  //Query gql
  const GET_TRIP_SEARCH = gql`
    query GetTripSearch(
      $departurePlaces: String
      $destination: String
      $dateDeparture: Timestamp
    ) {
      getTripSearch(
        departure_places: $departurePlaces
        destination: $destination
        date_departure: $dateDeparture
      ) {
        id
        departure_places
        date_departure
        destination
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
        arrival_date
        price
        description
        users {
          username
        }
      }
    }
  `;

  const [tripId, setTripId] = useState();

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

  const steps = [
    "RECHERCHER VOTRE TRAJET",
    "SELECTIONNER UN TRAJET",
    "VALIDER VOTRE PROJET",
    "FELICITATION"
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [resultat, setResultat] = useState([]);
  //event to retrieve trips



  const handleclick = (e: any) => {
    // if (form.departure === "départ") {
    //   setErrorMessage("merci de selectionner une ville de départ");
    //   setErrorForm(true);
    // } else if (form.arrival === "destination") {
    //   setErrorMessage("merci de selectionner une ville d'arrivée");
    //   setErrorForm(true);
    // } else if (form.date === today) {
    //   setErrorMessage("merci de selectionner une date de départ");
    //   setErrorForm(true);
    // } else if (form.passenger === "") {
    //   setErrorMessage("merci de selectionner un nombre de passager");
    //   setErrorForm(true);
    // } else {
    //   setErrorForm(false);
    //   setActiveStep(1);

    //   console.log(data.getTripSearch, "boomm",error,loading);
    // }
    setActiveStep(1);
    setResultat(data?.getTripSearch);
  };

  // const handleclick = ()=>{
  //     setActiveStep(1);
  // }
  //event to choose one trip
  const submitTrip = (e: any) => {
    setActiveStep(2);

    
    console.log(dataTripId.getTrip.destination);
  };
  const hoverSetId =(e:any)=>{
    setTripId(e.target.value);
    console.log(tripId);
    
  }
  const stepBack = () => {
    setActiveStep(1);
  };
  const joinTrip =()=>{
    setActiveStep(3);
  }
  return (
    <div className="flex h-screen items-center flex-col w-screen">
      <h1 className="text-whodrivesPink mt-10 mb-8">JE CHERCHE UN TRAJET</h1>
      {activeStep !== 3 ? (<Stepper activeStep={activeStep} className="mb-12">
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>):null}
      {activeStep !== 2 && activeStep !== 3   ? (
        <SearchTrip
          onclick={handleclick}
          form={form}
          setForm={setForm}
          today={today}
        />
      ) : null}
      {errorForm && <p className="text-red-600">{errorMessage}</p>}
      {/* <div className="w-2/3 border border-black  mb-4"></div> */}
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
                place={tab[1].place}
                tarif={el.price}
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
            départ={dataTripId.getTrip.departure_places}
            arrivée={dataTripId.getTrip.destination}
            place={tab[1].place}
            prix={dataTripId.getTrip.price}
            date={moment(dataTripId.getTrip.date_departure).format("DD/MM/YYYY")}
            stepBack={stepBack}
            joinTrip={joinTrip}
          />
        </div>
      ) : null}
      {
        activeStep === 3 ?(
            <CongratulationPage/>
        ):null
      }
    </div>
  );
}

export default SearchingTripPage;