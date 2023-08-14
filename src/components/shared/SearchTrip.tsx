import React from "react";
import { useEffect, useState } from "react";

interface ISearchTrip {
  onclick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  form: any | undefined;
  setForm: any | undefined;
  today: string;
}

interface IFormState {
  departure: string;
  arrival: string;
  date: string;
}

export default function SearchTripComponent({
  onclick,
  form,
  setForm,
  today,
}: ISearchTrip) {
  interface DataState {
    nom: string;
    code: string;
  }

  //State change word(city) to call API
  const [word, setWord] = useState({
    departure: "",
    arrival: "",
  });
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState({
    departure: false,
    arrival: false,
  });

  const getcity = async (word: string) => {
    try {
      const response = await fetch(
        `https://geo.api.gouv.fr/communes?nom=${word}&fields=code,nom,codeDepartement&limit=5`
      );
      const json = await response.json();
      setData(json.map((e: any) => ({ code: e.codeDepartement, nom: e.nom })));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setDisplay({ arrival: false, departure: true });
    getcity(word.departure);
  }, [word.departure]);

  useEffect(() => {
    setDisplay({ arrival: true, departure: false });
    getcity(word.arrival);
  }, [word.arrival]);

  useEffect(() => {
    setDisplay({ arrival: false, departure: false });
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    setWord({ ...word, [name]: value });
  };

  const isDisabled = !form.departure || !form.arrival || !form.date;

  //submit form trip
  return (
    <div className="flex flex-col justify-center py-5 mx-4 align-middle md:flex-row md:mx-0">
      <div className="flex flex-col items-center p-8 mb-4 md:mb-0 md:p-0 md:border md:border-black md:bg-white bg-lightBlue md:flex-row ">
        <div className="flex flex-col md:border-r-2 md:border-gray-300">
          <div className="flex flex-col pb-4 md:flex-row md:pb-0">
            <img
              src="/assets/icons/map-grey.svg"
              alt=""
              className="hidden m-1 md:flex"
            />
            <label className="text-center md:hidden" htmlFor="depart">
              Ville de départ
            </label>
            <input
              className="p-2 border md:p-0 border-whodrivesGrey md:focus:outline-none md:border-none focus:outline-validBlue"
              type="text"
              name="departure"
              onChange={handleChange}
              value={
                form.departure === "départ" ? word.departure : form.departure
              }
              placeholder="Départ"
              onClick={() => {
                setForm({ ...form, departure: "départ" });
                setWord({ ...word, departure: "" });
              }}
            />
          </div>
          <div className="absolute z-10 mt-16 bg-white md:mt-10">
            {data.map(
              (el: DataState, index) =>
                display.departure && (
                  <option
                    className="md:cursor-pointer"
                    key={index}
                    value={el.nom}
                    onClick={(e: React.MouseEvent<HTMLOptionElement>) => {
                      setForm({ ...form, departure: e.currentTarget.value });
                      setDisplay({ ...display, departure: false });
                    }}
                  >
                    {el.nom} - {el.code}
                  </option>
                )
            )}
          </div>
        </div>
        <div className="flex flex-col md:border-r-2 md:border-whodrivesGrey">
          <div className="flex flex-col pb-4 md:flex-row md:pb-0">
            <img
              src="/assets/icons/map-grey.svg"
              alt=""
              className="hidden m-1 md:flex"
            />
            <label className="text-center md:hidden" htmlFor="depart">
              Destination
            </label>
            <input
              className="p-2 border md:p-0 border-whodrivesGrey md:focus:outline-none md:border-none focus:outline-validBlue"
              type="text"
              name="arrival"
              onChange={handleChange}
              value={
                form.arrival === "destination" ? word.arrival : form.arrival
              }
              placeholder="Destination"
              onClick={() => {
                setForm({ ...form, arrival: "destination" });
                setWord({ ...word, arrival: "" });
              }}
            />
          </div>
          <div className="absolute z-10 mt-16 bg-white md:mt-10 ">
            {display.arrival &&
              data.map((el: DataState, index) => (
                <option
                  className="md:cursor-pointer"
                  key={index}
                  value={el.nom}
                  onClick={(e: any) => {
                    setForm({ ...form, arrival: e.currentTarget.value });
                    setDisplay({ ...display, arrival: false });
                  }}
                >
                  {el.nom} - {el.code}
                </option>
              ))}
          </div>
        </div>

        <label className="text-center md:hidden" htmlFor="depart">
          Date
        </label>
        <input
          className="p-2 border md:pr-5 md:ml-5 md:p-0 border-whodrivesGrey md:focus:outline-none md:border-none focus:outline-validBlue"
          type="date"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          value={form.date}
          placeholder={today}
        />
      </div>
      <div className="flex justify-center">
        <button type="submit" onClick={onclick} disabled={isDisabled}>
          <p
            className={
              isDisabled
                ? "grey-button p-2 text-xs"
                : "green-button p-2 text-xs"
            }
          >
            Rechercher
          </p>
        </button>
      </div>
    </div>
  );
}
