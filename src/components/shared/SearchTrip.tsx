import "../../styles/global.css";

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
    <div className="flex flex-col md:flex-row justify-center py-5 align-middle mx-4 md:mx-0">
      <div className="flex flex-col md:flex-row items-center bg-white border border-black ">
        <div className="flex flex-col md:border-r-2 md:border-whodrivesGrey">
          <div className="flex flex-row">
            <img src="/assets/icons/map-grey.svg" alt="" className="m-1" />
            <input
              className=""
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
          <div className="absolute z-10 mt-10 bg-white">
            {data.map(
              (el: DataState, index) =>
                display.departure && (
                  <option
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
        <div className="flex flex-col md:border-r-2 md:order-whodrivesGrey">
          <div className="flex flex-row">
            <img src="/assets/icons/map-grey.svg" alt="" className="m-1" />
            <input
              className=""
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
          <div className="absolute z-10 mt-10 bg-white ">
            {display.arrival &&
              data.map((el: DataState, index) => (
                <option
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

        <input
          className="pr-5 ml-5 border-whodrivesGrey"
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
