import React from "react";
import { useEffect, useState } from "react";
import "../../styles/searchTrip.css";
import { JsxElement } from "typescript";

interface ISearchTrip {
  onclick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
const SearchTrip = ({ onclick }: ISearchTrip) => {
  const today = new Date().toLocaleDateString("en-us");

  interface FormState {
    départ: string;
    destination: string;
    date: string;
    personnes: string;
  }

  const [form, setForm] = useState<FormState>({
    départ: "départ",
    destination: "destination",
    date: today,
    personnes: "",
  });

  const [word, setWord] = useState({
    depart: "",
    destination: "",
  });
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState({
    depart: false,
    destination: false,
  });
  const getcity = async (word: string) => {
    try {
      const response = await fetch(
        `https://geo.api.gouv.fr/communes?nom=${word}&fields=population&limit=5`
      );
      const json = await response.json();
      console.log("JSON", json);
      setData(json.map((e: any) => e.nom));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setDisplay({ destination: false, depart: true });
    getcity(word.depart);
  }, [word.depart]);

  useEffect(() => {
    setDisplay({ destination: true, depart: false });
    getcity(word.destination);
  }, [word.destination]);

  const handleChange = (e: any) => {
    const {
      target: { name, value },
    } = e;
    setWord({ ...word, [name]: value });
  };
  console.log(form);

  // console.log(data);
  // console.log(word);
  // console.log(form);
  //   shadow-[-0px_3px_0px_0px_#909090]
  return (
    <div className="flex flex-row border-2 items-center p-2 bb mt-24 mb-10">
      <div className="flex flex-col border-r-4 border-whodrivesGrey w-30">
        <div className=" flex flex-row h-20 ">
          <img src="/assets/icons/map-grey.svg" alt="" className="m-1" />
          <input
            className=""
            type="text"
            name="depart"
            onChange={handleChange}
            value={word.depart}
            placeholder={form.départ}
          />
        </div>
        <div className="z-10  border-2 h-1/1 absolute bg-white mt-20">
          {display.depart &&
            data.map((el) => (
              <option
                key={el}
                value={el}
                onClick={(e: React.MouseEvent<HTMLOptionElement>) => {
                  setForm({ ...form, départ: e.currentTarget.value });
                  setDisplay({ ...display, depart: false });
                }}
              >
                {el}
              </option>
            ))}
        </div>
      </div>
      <div className="flex flex-col border-r-4 border-whodrivesGrey w-30">
        <div className="flex flex-row h-20 ">
          <img src="/assets/icons/map-grey.svg" alt="" className="m-1" />
          <input
            className=""
            type="text"
            name="destination"
            onChange={handleChange}
            value={word.destination}
            placeholder="destination"
          />
        </div>
        {display.destination &&
          data.map((el) => (
            <option
              key={el}
              value={el}
              onClick={(e: any) => {
                setForm({ ...form, destination: e.currentTarget.value });
                setDisplay({ ...display, destination: false });
              }}
            >
              {el}
            </option>
          ))}
      </div>

      <input
        className="h-20 border-r-4 border-whodrivesGrey ml-5 pr-5 w-30"
        type="date"
        value={form.date}
      />
      <select
        name="1"
        placeholder="personne"
        style={{ height: "100%" }}
        className="h-20 border-r-4  ml-5 mr-5 w-10"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <button onClick={onclick} className="h-20 w-30">
        rechercher
      </button>
    </div>
  );
};

export default SearchTrip;
