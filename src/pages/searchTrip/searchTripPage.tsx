import { gql, useMutation, useQuery } from "@apollo/client";
import { Step, StepLabel, Stepper } from "@mui/material";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FilterSearchComponent from "../../components/searchTrip/FilterSearchComponent";
import SearchTripResult from "../../components/searchTrip/SearchTripResult";
import SelectedTrip from "../../components/searchTrip/SelectedTrip";
import SearchTrip from "../../components/shared/SearchTrip";
import { AuthContext } from "../../context/AuthContext";

const hoursRange = [
  {
    min: "00:01:00",
    max: "06:00:00",
  },
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
];

interface FormState {
  departure: string;
  arrival: string;
  date: string;
}

interface ITrip {
  id: number;
  users: User[];
  available_seat: number;
  price: number;
  date_departure: string;
  hour_departure: string;
  departure_place: string;
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
  const [availableSeatTrip, setAvailableSeatTrip] = useState(1);

  const navigate = useNavigate();

  //Query gql
  const GET_TRIP_BY_HOUR = gql`
    query GetTrips(
      $departurePlace: String
      $destination: String
      $dateDeparture: Date
      $minHour: String
      $maxHour: String
    ) {
      getTripSearchByHourRange(
        departure_place: $departurePlace
        destination: $destination
        minHour: $minHour
        maxHour: $maxHour
        date_departure: $dateDeparture
      ) {
        id
        departure_place
        destination
        date_departure
        available_seat
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
        departure_place
        destination
        date_departure
        available_seat
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
    mutation UpdateTripPlace($updateTripId: ID!, $availableSeat: Int) {
      updateTripPlace(id: $updateTripId, available_seat: $availableSeat) {
        id
        departure_place
        destination
        date_departure
        arrival_date
        price
        description
        hour_departure
        available_seat
      }
    }
  `;

  const [rangeSelected, setRangeSelected] = useState<null | number>(null);
  const [selectTrip] = useMutation(SELECT_TRIP);
  const [updateTripPlace] = useMutation(UPDATE_TRIP, {
    variables: {
      updateTripId: tripId,
      availableSeat: availableSeatTrip,
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
    departure: "",
    arrival: "",
    date: "",
  });
  let [errorMessage, setErrorMessage] = useState("");
  const [errorForm, setErrorForm] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_TRIP_BY_HOUR, {
    variables: {
      departurePlace: form.departure,
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
        departurePlace: form.departure,
        destination: form.arrival,
        dateDeparture: form.date,
        minHour: hoursRange[rangeSelected].min,
        maxHour: hoursRange[rangeSelected].max,
      });
    } else {
      refetch({
        departurePlace: form.departure,
        destination: form.arrival,
        dateDeparture: form.date,
        minHour: "",
        maxHour: "",
      });
    }
  }, [rangeSelected]);

  //installation stepper
  const steps = [
    "Rerchercher un trajet",
    "Selectionner un trajet",
    "Valider le trajet",
  ];

  const [activeStep, setActiveStep] = useState(0);

  //event to retrieve trips
  const handleclick = () => {
    setActiveStep(1);
  };

  //filter by price
  const filterByPrice = () => {
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
  const filterByDate = () => {
    const sortedResultat = [...resultat];
    const convertToMinutes = (timeString: any) => {
      const [hours, minutes] = timeString.split(":");
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
  };
  //filter reset
  const filterReset = () => {
    const sortedResultat = [...resultat];
    sortedResultat.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setResultat(sortedResultat);
  };
  //event to choose one trip
  const submitTrip = () => {
    setActiveStep(2);
    setAvailableSeatTrip(dataTripId.getTrip.available_seat);
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
            availableSeat: availableSeatTrip - 1,
          },
        }),
      ])
        .then((responses) => {
          navigate("/dashboard");
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
    <div className="w-full flex-grow min-h-[calc(100vh-10rem)] pt-5">
      <h1 className="mb-4 text-center text-whodrivesPink">
        Je cherche un trajet
      </h1>
      {activeStep !== 3 ? (
        <Stepper activeStep={activeStep} alternativeLabel>
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
      {activeStep === 1 ? (
        <div className="flex flex-row justify-center w-2/3 pt-5 mx-auto border-t-2 border-black">
          <FilterSearchComponent
            filterByPrice={filterByPrice}
            changeHourRange={changeHourRange}
            rangeSelected={rangeSelected}
            hoursRange={hoursRange}
            filterByDate={filterByDate}
            filterReset={filterReset}
          />
          <div className="flex flex-col px-5 w-1/1 h-5/6">
            {resultat && resultat.length > 0 ? (
              resultat.map((el: ITrip, index) =>
                el.available_seat !== 0 ? (
                  <SearchTripResult
                    key={index}
                    value={el.id}
                    hoverSetId={hoverSetId}
                    nameProfil={el.users[0].username}
                    date={moment(el.date_departure).format("DD/MM/YYYY")}
                    seats={el.available_seat}
                    price={el.price}
                    hour={`${el.hour_departure.split(":")[0]}h${
                      el.hour_departure.split(":")[1]
                    }`}
                    departure={el.departure_place}
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
            nameProfil={dataTripId.getTrip.users[0].username}
            departure={dataTripId.getTrip.departure_place}
            arrival={dataTripId.getTrip.destination}
            seats={dataTripId.getTrip.available_seat}
            price={dataTripId.getTrip.price}
            hour={`${dataTripId.getTrip.hour_departure.split(":")[0]}h${
              dataTripId.getTrip.hour_departure.split(":")[1]
            }`}
            date={moment(dataTripId.getTrip.date_departure).format(
              "DD/MM/YYYY"
            )}
            stepBack={stepBack}
            joinTrip={joinTrip}
          />
        </div>
      ) : null}
    </div>
  );
}
