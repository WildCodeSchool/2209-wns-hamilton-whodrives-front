import { useState } from "react";
import SearchTrip from "../../components/shared/SearchTrip";
import "../../styles/searchTrip.css";
import SearchTripResult from "../../components/searchTrip/SearchTripResult";
import { Step, StepLabel, Stepper } from "@mui/material";
import FilterSearchComponent from "../../components/searchTrip/FilterSearchComponent";

function SearchingTripPage() {
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

  const steps = [
    "RECHERCHER VOTRE TRAJET",
    "SELECTIONNER UN TRAJET",
    "VALIDER VOTRE PROJET",
  ];
  const [activeStep, setActiveStep] = useState(0);

  //event to retrieve trips
  const handleclick = () => {
    setActiveStep(1);
  };
  //event to choose one trip
  const submitTrip = () => {
    setActiveStep(2);
  };
  return (
    <div className="flex h-screen items-center flex-col w-screen">
      <h1 className="text-whodrivesPink mt-10 mb-14">JE CHERCHE UN TRAJET</h1>
      <Stepper activeStep={activeStep} className="mb-12">
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <SearchTrip onclick={handleclick} />
      {activeStep === 1 ? (
        <div className="step-1 flex flex-row">
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
    </div>
  );
}

export default SearchingTripPage;
