import React from "react";
import { useEffect, useState } from "react";
import "../../styles/global.css";

interface ISearchTrip {
  onclick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  form: any | undefined;
  setForm: any | undefined;
  today: any;
}

export default function SearchTripComponent({
  onclick,
  form,
  setForm,
  today,
}: ISearchTrip) {
  interface FormState {
    departure: string;
    arrival: string;
    date: string;
    passenger: string;
  }

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
  const handleChange = (e: any) => {
    const {
      target: { name, value },
    } = e;
    setWord({ ...word, [name]: value });
  };

  //submit form trip

  return (
    <div className="flex flex-row items-center justify-center mt-5 mb-12 align-middle bg-white border border-black ">
      <div className="flex flex-col border-r-4 border-whodrivesGrey">
        <div className="flex flex-row ">
          <img src="/assets/icons/map-grey.svg" alt="" className="m-1" />
          <input
            className=""
            type="text"
            name="departure"
            onChange={handleChange}
            value={
              form.departure === "départ" ? word.departure : form.departure
            }
            placeholder="départ"
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
      <div className="flex flex-col border-r-4 border-whodrivesGrey">
        <div className="flex flex-row">
          <img src="/assets/icons/map-grey.svg" alt="" className="m-1" />
          <input
            className=""
            type="text"
            name="arrival"
            onChange={handleChange}
            value={form.arrival === "destination" ? word.arrival : form.arrival}
            placeholder="destination"
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
        className="pr-5 ml-5 border-r-4 border-whodrivesGrey"
        type="date"
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        value={form.date}
        placeholder={today}
      />
      <div className="flex flex-row ml-2 mr-2 sm:w-1/1">
        <img src="/assets/icons/user-plus-grey.svg" alt="" />
        <select
          name="passenger"
          placeholder="personne"
          style={{ height: "100%" }}
          className="w-10 ml-5  "
          onChange={(e) => setForm({ ...form, passenger: e.target.value })}
        >
          <option value="0"></option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      <button
        onClick={onclick}
        className=" bg-whodrivesGreen min-h-full p-2 pl-4 pr-4 text-white border-l-2 border-black searchTripButton sm:w-1/1 "
      >
        rechercher
      </button>
    </div>
  );
}
