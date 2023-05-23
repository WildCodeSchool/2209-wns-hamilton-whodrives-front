import { useState } from "react";
import SearchTrip from "../../components/shared/SearchTrip";
import "../../styles/searchTrip.css";
import SearchTripResult from "../../components/searchTrip/SearchTripResult";
import { Step, StepLabel, Stepper } from "@mui/material";


function SearchingTripPage() {
    let tab = [{
        départ:"Lyon",
        arrivé:"Metz",
        tarif:20,
        place:3,
        date:new Date()
    },
    {
        départ:"Paris",
        arrivé:"Lille",
        tarif:10,
        place:1,
        date:new Date()
    },
    {
        départ:"Roubaix",
        arrivé:"Nante",
        tarif:32,
        place:4,
        date:new Date()
    },
   ]
  const handleclick = () => {
setActiveStep(1)
  };
  const steps = ["RECHERCHER VOTRE TRAJET","SELECTIONNER UN TRAJET","VALIDER VOTRE PROJET"]
  const [activeStep, setActiveStep] = useState(0)
  const submitTrip = ()=>{
    setActiveStep(2)
  }
  return (
    <div className="flex h-screen items-center flex-col w-screen">
      <h1 className="text-whodrivesPink mt-10">JE CHERCHE UN TRAJET</h1>
<Stepper activeStep={activeStep}>
{
    steps.map((step)=>(
   <Step key={step}>
     <StepLabel>{step}</StepLabel>
   </Step>
    ))
}
</Stepper>
      <SearchTrip onclick={handleclick} />

      { 
      tab.map((el)=>(
        activeStep === 1 ?
          <SearchTripResult date={el.date} place={el.place} tarif={el.tarif} départ={el.départ} arrivé={el.arrivé} submitTrip={submitTrip} />
          : null
          ))
      }
    
    </div>
  );
}

export default SearchingTripPage;
