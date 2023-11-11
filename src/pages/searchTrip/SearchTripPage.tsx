import { useState, useContext, useEffect } from "react";
import SearchTrip from "../../components/shared/SearchTrip";
import "../../styles/searchTrip.css";
import SearchTripResult from "../../components/searchTrip/SearchTripResult";
import { Step, StepLabel, Stepper } from "@mui/material";
import FilterSearchComponent from "../../components/searchTrip/FilterSearchComponent";
import SelectedTrip from "../../components/searchTrip/SelectedTrip";
import { useQuery, gql, useMutation } from "@apollo/client";
import moment from "moment";
import CongratulationsPage from "../../components/shared/CongratulationsPage";
import { AuthContext } from "../../context/AuthContext";

const hoursRange = [
  {
    min: "06:01:00",
    max: "12:00:00",
  },
  {
    min: "12:01:00",
    max: "18:00:00",
  },
  {
    min: "18:01:00",
    max: "00:00:00",
  },
  {
    min: "00:01:00",
    max: "06:00:00",
  },
];

interface FormState {
  departure: string;
  arrival: string;
  date: string;
  passenger: number;
}
interface ITrip {
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
  email: string;
}

export default function SearchTripPage(): JSX.Element {
  const [resultat, setResultat] = useState<ITrip[]>([]);
  const [tripId, setTripId] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { userInfos } = useContext(AuthContext);
  const [placeAvailableTrip, setPlaceAvailableTrip] = useState(1);

  //Query gql

  const GET_TRIP_BY_HOUR = gql`
    query GetTrips(
      $departurePlaces: String
      $destination: String
      $dateDeparture: Date
      $minHour: String
      $maxHour: String
    ) {
      getTripSearchByHourRange(
        departure_places: $departurePlaces
        destination: $destination
        minHour: $minHour
        maxHour: $maxHour
        date_departure: $dateDeparture
      ) {
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
          email
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
          email
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
  const UPDATE_TRIP = gql`
    mutation UpdateTripPlace($updateTripId: ID!, $placeAvailable: Int) {
      updateTripPlace(id: $updateTripId, place_available: $placeAvailable) {
        id
        departure_places
        destination
        date_departure
        arrival_date
        price
        description
        hour_departure
        place_available
      }
    }
  `;
  const [rangeSelected, setRangeSelected] = useState<null | number>(null);
  const [selectTrip] = useMutation(SELECT_TRIP);
  const [updateTripPlace] = useMutation(UPDATE_TRIP, {
    variables: {
      updateTripId: tripId,
      placeAvailable: placeAvailableTrip,
    },
  });

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

  const { loading, error, data, refetch } = useQuery(GET_TRIP_BY_HOUR, {
    variables: {
      departurePlaces: form.departure,
      destination: form.arrival,
      dateDeparture: form.date,
      minHour: "",
      maxHour: "",
    },
    onCompleted(data) {
      setResultat(data?.getTripSearchByHourRange);
    },
    onError(error) {
      console.log({ error });
    },
  });
  useEffect(() => {
    if (rangeSelected !== null) {
      refetch({
        departurePlaces: form.departure,
        destination: form.arrival,
        dateDeparture: form.date,
        minHour: hoursRange[rangeSelected].min,
        maxHour: hoursRange[rangeSelected].max,
      });
    } else {
      refetch({
        departurePlaces: form.departure,
        destination: form.arrival,
        dateDeparture: form.date,
        minHour: "",
        maxHour: "",
      });
    }
  }, [rangeSelected]);

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
  };
  //filter by price
  const sortByPrice = () => {
    const sortedResultat = [...resultat];
    sortedResultat.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setResultat(sortedResultat);
  };
  //filter by date
  const filterByDate =()=>{
    const sortedResultat = [...resultat];
    const convertToMinutes = (timeString :any) => {
      const [hours, minutes] = timeString.split(':');
      const hoursInt = parseInt(hours, 10);
      const minutesInt = parseInt(minutes, 10);
      return hoursInt * 60 + minutesInt;
    };
    sortedResultat.sort((a, b) => {
      const aTime = convertToMinutes(a.hour_departure);
      const bTime = convertToMinutes(b.hour_departure);
      
      if (sortOrder === "asc") {
        return aTime - bTime;
      } else {
        return bTime - aTime;
      }
    });
    setResultat(sortedResultat);
  }
  //filter reset
  const filterReset = ()=>{
    const sortedResultat = [...resultat];
    sortedResultat.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });

    setResultat(sortedResultat);
  }
  //event to choose one trip
  const submitTrip = () => {
    setActiveStep(2);
    setPlaceAvailableTrip(dataTripId.getTrip.place_available);
  };
  const hoverSetId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTripId(e.target.value);
  };
  const stepBack = () => {
    setActiveStep(1);
  };
  const joinTrip = () => {
    if (dataTripId.getTrip.users[0].email !== userInfos.email) {
      Promise.all([
        selectTrip({ variables: { tripId } }),
        updateTripPlace({
          variables: {
            updateTripId: tripId,
            placeAvailable: placeAvailableTrip - 1,
          },
        }),
      ])
        .then((responses) => {
          setActiveStep(3);
        })
        .catch((errors) => {});
    } else {
      alert("Impossible rejoindre le trajet");
    }
  };
  const changeHourRange = (key: number) => {
    setRangeSelected((r) => (r === key ? null : key));
  };

  useEffect(() => {}, [rangeSelected]);
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
          <FilterSearchComponent
            filterByPriceClick={sortByPrice}
            changeHourRange={changeHourRange}
            rangeSelected={rangeSelected}
            hoursRange={hoursRange}
            filterByDate={filterByDate}
            filterReset={filterReset}
          />
          <div className="flex flex-col pt-0 pl-5 pr-5 overflow-auto w-1/1 h-5/6">
            {resultat && resultat.length > 0 ? (
              resultat.map((el: ITrip, index) =>
                el.place_available !== 0 ? (
                  <SearchTripResult
                    key={index}
                    value={el.id}
                    hoverSetId={hoverSetId}
                    nameProfil={el.users[0].username}
                    date={moment(el.date_departure).format("DD/MM/YYYY")}
                    seats={el.place_available}
                    price={el.price}
                    hour={`${el.hour_departure.split(":")[0]}h${el.hour_departure.split(":")[1]}`}
                    departure={el.departure_places}
                    arrival={el.destination}
                    submitTrip={submitTrip}
                  />
                ) : (
                    <div>Aucun trajet ne correspond à votre recherche</div>
                  )
              )
            ) : (
              <div>Aucun trajet ne correspond à votre recherche</div>
            )}
          </div>
        </div>
      ) : null}
      {activeStep === 2 ? (
        <div className="flex flex-row step-1">
          <SelectedTrip
            passenger={dataTripId.getTrip.passenger}
            nameProfil={dataTripId.getTrip.users[0].username}
            departure={dataTripId.getTrip.departure_places}
            arrival={dataTripId.getTrip.destination}
            seats={dataTripId.getTrip.place_available}
            price={dataTripId.getTrip.price}
            hour={`${dataTripId.getTrip.hour_departure.split(":")[0]}h${dataTripId.getTrip.hour_departure.split(":")[1]}`}
            date={moment(dataTripId.getTrip.date_departure).format(
              "DD/MM/YYYY"
            )}
            stepBack={stepBack}
            joinTrip={joinTrip}
          />
        </div>
      ) : null}
      {activeStep === 3 ? (
        <CongratulationsPage messageCongrats="VOUS AVEZ REJOINT LE TRAJET" />
      ) : null}
    </div>
  );
}