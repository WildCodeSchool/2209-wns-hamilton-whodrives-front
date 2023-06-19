import { useState } from "react";
import SearchTrip from "../../components/shared/SearchTrip";
import "../../styles/searchTrip.css";
import SearchTripResult from "../../components/searchTrip/SearchTripResult";
import { Step, StepLabel, Stepper } from "@mui/material";
import FilterSearchComponent from "../../components/searchTrip/FilterSearchComponent";
import SelectedTrip from "../../components/searchTrip/SelectedTrip";

interface FormState {
  departure: string;
  arrival: string;
  date: string;
  passenger: string;
}
function SearchingTripPage() {
  let [errorMessage, setErrorMessage] = useState("");
  const today = new Date().toLocaleDateString("en-us");
  let tab = [
    {
      départ: "Lyon",
      arrivé: "Metz",
      tarif: 20,
      place: 3,
      date: new Date(),
    },
    {
      départ: "Paris",
      arrivé: "Lille",
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
  const [errorForm, setErrorForm] = useState(false);
  const [form, setForm] = useState<FormState>({
    departure: "départ",
    arrival: "destination",
    date: today,
    passenger: "",
  });
  const steps = [
    "RECHERCHER VOTRE TRAJET",
    "SELECTIONNER UN TRAJET",
    "VALIDER VOTRE PROJET",
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
    } else if (form.passenger === "") {
      setErrorMessage("merci de selectionner un nombre de passager");
      setErrorForm(true);
    } else {
      setErrorForm(false);
      setActiveStep(1);
      console.warn("formulaire envoyé");
    }
  };
// const handleclick = ()=>{
//     setActiveStep(1);
// }
  //event to choose one trip
  const submitTrip = () => {
    setActiveStep(2);
    console.log();
    
  };
  const stepBack = () => {
    setActiveStep(1);
  };
  return (
    <div className="flex h-screen items-center flex-col w-screen">
      <h1 className="text-whodrivesPink mt-10 mb-8">JE CHERCHE UN TRAJET</h1>
      <Stepper activeStep={activeStep} className="mb-12">
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
  {  activeStep !== 2 ? ( <SearchTrip
        onclick={handleclick}
        form={form}
        setForm={setForm}
        today={today}
      />):null}
      {errorForm && <p className="text-red-600">{errorMessage}</p>}
      {/* <div className="w-2/3 border border-black  mb-4"></div> */}
      {activeStep === 1 ? (
        <div className="step-1 flex flex-row border-t-2 border-black pt-5">
          <FilterSearchComponent />
          <div className="flex flex-col w-1/1  h-5/6  overflow-auto pl-5 pr-5 pt-0">
            {tab.map((el) => (
              <SearchTripResult
                date={el.date}
                place={el.place}
                tarif={el.tarif}
                départ={el.départ}
                arrivé={el.arrivé}
                submitTrip={submitTrip}
              />
            ))}
          </div>
        </div>
      ) : null}
      {activeStep === 2 ? (
        <div className="step-1 flex flex-row">
          <SelectedTrip
            départ={tab[1].départ}
            arrivée={tab[1].arrivé}
            place={tab[1].place}
            prix={tab[1].tarif}
            date={"12/06/2023"}
            onClick={stepBack}
          />
        </div>
      ) : null}
    </div>
  );
}

export default SearchingTripPage;
