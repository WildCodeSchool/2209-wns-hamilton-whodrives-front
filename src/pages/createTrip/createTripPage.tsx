import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";

import ConfirmTrip from "../../components/createTrip/ConfirmTrip";
import LocationField from "../../components/createTrip/LocationFields";
import PublishTrip from "../../components/createTrip/PublishTrip";

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
    "Création de trajet",
    "Confirmation du trajet",
    "Publication du trajet",
  ];

  const [activeStep, setActiveStep] = React.useState(0);

  const [trip, setTrip] = useState<TripData>({
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

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const BackToPreviousStage = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <LocationField
            trip={trip}
            handleLocationFieldData={handleLocationFieldData}
          />
        );
      case 1:
        return (
          <ConfirmTrip
            trip={trip}
            handleConfirmTripData={handleConfirmTripData}
            BackToPreviousStage={BackToPreviousStage}
          />
        );
      case 2:
        return (
          <PublishTrip trip={trip} BackToPreviousStage={BackToPreviousStage} />
        );
      default:
        return "Unknown step";
    }
  }

  return (
    <div className="w-full flex-grow min-h-[calc(100vh-10rem)] pt-5">
      <h1 className="mb-4 text-center text-whodrivesGreen">
        Je publie un trajet
      </h1>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
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
    </div>
  );
}

export default CreateTripPage;
