import React from "react";
import { useEffect, useState } from "react";

interface ISearchTrip {
  onclick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function SearchTripComponent({ onclick }: ISearchTrip,) {
  const today = new Date().toLocaleDateString("en-us");


  interface FormState {
    departure: string;
    arrival: string;
    date: string;
    passenger: string;
  }
  const [form, setForm] = useState<FormState>({
    departure: "départ",
    arrival: "destination",
    date: today,
    passenger: "",
  });

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
        `https://geo.api.gouv.fr/communes?nom=${word}&fields=population&limit=5`
      );
      const json = await response.json();
      setData(json.map((e: any) => e.nom));
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
  useEffect(()=>{
    setDisplay({ arrival: false, departure: false });
},[])
  const handleChange = (e: any) => {
    const {
      target: { name, value },
    } = e;
    setWord({ ...word, [name]: value });
  };
  console.log(display);
  console.log(form);
  //submit form trip
  
  

  return (
    <div className=" flex flex-row items-center justify-center align-middle bg-white mt-5  border-2 border-black-900 mb-12 ">
      <div className="flex flex-col border-r-4 border-whodrivesGrey">
        <div className="flex flex-row ">
          <img src="/assets/icons/map-grey.svg" alt="" className="m-1" />
          <input
            className=""
            type="text"
            name="departure"
            onChange={handleChange}
            value={form.departure === "départ" ? word.departure :form.departure}
            placeholder="départ"
            onClick={()=>{setForm({ ...form, departure: "départ" })
            setWord({ ...word, departure: "" });
        }}
          />
        </div>
        <div className="absolute z-10 mt-10 bg-white">
           {  data.map((el, index) => (
          display.departure &&
              <option
                key={index}
                value={el}
                onClick={(e: React.MouseEvent<HTMLOptionElement>) => {
                  setForm({ ...form, departure: e.currentTarget.value });
                  setDisplay({ ...display, departure: false });
                }}
              >
                {el}
              </option>
            ))}
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
            value={form.arrival === "destination" ? word.arrival :form.arrival}
            placeholder="destination"
            onClick={()=>{setForm({ ...form, arrival: "destination" })
            setWord({ ...word, arrival: "" });
        }}   
          />
        </div>
        <div className="absolute z-10 mt-10 bg-white ">
        {display.arrival &&
          data.map((el, index) => (
            <option
              key={index}
              value={el}
              onClick={(e: any) => {
                setForm({ ...form, arrival: e.currentTarget.value });
                setDisplay({ ...display, arrival: false });
              }}
            >
              {el}
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

      <select
        name="passenger"
        placeholder="personne"
        style={{ height: "100%" }}
        className="w-10 ml-5  border-r-4"
        onChange={(e) => setForm({ ...form, passenger: e.target.value })}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <button onClick={onclick} className=" bg-whodrivesGreen min-h-full p-2 pl-4 pr-4 text-white ">
        rechercher
      </button>
    </div>
  );
}
