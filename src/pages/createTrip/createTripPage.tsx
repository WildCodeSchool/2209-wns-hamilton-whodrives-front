import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";

import ConfirmReturnTrip from "../../components/createTrip/ConfirmReturnTrip";
import ConfirmTrip from "../../components/createTrip/ConfirmTrip";
import LocationField from "../../components/createTrip/LocationFields";
import PublishTrip from "../../components/createTrip/PublishTrip";
import ReturnTrip from "../../components/createTrip/ReturnTrip";

// recuperer les donner du formulaire et les envoyer a la page suivante

interface TripData {
  departure: string;
  arrival: string;
  date: string;
  time: string;
  passengers: string;
  price: string;
  description: string;
}

function CreateTripPage(): JSX.Element {
  const steps = [
    "création de trajet",
    "confirmation du trajet",
    "trajet retour",
    "confirmation du trajet retour&",
    "publication du trajet",
  ];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const [trip, setTrip] = useState<TripData>({
    departure: "",
    arrival: "",
    date: "",
    time: "",
    passengers: "",
    price: "",
    description: "",
  });

  const [returnTrip, setReturnTrip] = useState<TripData>({
    departure: "",
    arrival: "",
    date: "",
    time: "",
    passengers: "",
    price: "",
    description: "",
  });

  const handleLocationFieldData = (data: TripData) => {
    setTrip({ ...trip, ...data });
    handleNextStep();
  };

  const handleConfirmTripData = (data: TripData) => {
    setTrip((trip) => ({ ...trip, ...data }));
    handleNextStep();
  };

  const handlReturnTripData = (data: TripData) => {
    setReturnTrip({ ...returnTrip, ...data });
    handleNextStep();
  };

  const handleConfirmreturnTripData = (data: TripData) => {
    setReturnTrip((returnTrip) => ({ ...returnTrip, ...data }));
    handleNextStep();
  };

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const BackToFirstStage = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const setSkipReturnTrip = () => {
    //effacer le return trip
    setReturnTrip({
      departure: "",
      arrival: "",
      date: "",
      time: "",
      passengers: "",
      price: "",
      description: "",
    });

    setActiveStep((prevActiveStep) => prevActiveStep + 2);
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        // recuperer les donner du formulaire et + 1 a la step quand on click sur le bouton suivant situer dans le composant LocationField
        return (
          <LocationField
            trip={trip}
            handleLocationFieldData={handleLocationFieldData}
          />
        );
      case 1:
        // envoyer trip au composant ConfirmTrip
        return (
          <ConfirmTrip
            trip={trip}
            handleConfirmTripData={handleConfirmTripData}
            BackToFirstStage={BackToFirstStage}
            c
          />
        );
      case 2:
        return (
          <ReturnTrip
            trip={trip}
            setSkipReturnTrip={setSkipReturnTrip}
            handlReturnTripData={handlReturnTripData}
          />
        );
      case 3:
        return (
          <ConfirmReturnTrip
            returnTrip={returnTrip}
            handleConfirmreturnTripData={handleConfirmreturnTripData}
            BackToFirstStage={BackToFirstStage}
          />
        );
      case 4:
        return <PublishTrip returnTrip={returnTrip} trip={trip} />;
      default:
        return "Unknown step";
    }
  }

  const isStepOptional = (step: number) => {
    return step === 2 || step === 3;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mb: 1 }}>{getStepContent(activeStep)}</Typography>
        </React.Fragment>
      )}
    </Box>
  );
}

export default CreateTripPage;
