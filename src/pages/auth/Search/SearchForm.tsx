import React from "react";
import { useEffect, useState} from "react";
import "./Search.css";


const SearchForm: React.FC = () => {
  const today = new Date().toLocaleDateString("en-us", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

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

  return (
    <div className="flex flex-row bg-white w-1/2 h-20 items-center p-1">
      <div className="flex flex-col ">
      <div className="flex flex-row items-center w-1/1 border-r-4 border-grey pl-1 ">
        <img src="/assets/icons/map.png" alt="" className="bg-white w-auto h-7 mr-1"/>
        <input
        className=" h-12 "
          type="text"
          name="depart"
          onChange={handleChange}
          value={word.depart}
          placeholder={form.départ}
          
        />
        </div>
        {display.depart &&
          data.map((el) => (
            <option
              key={el}
              value={el}
              onClick={(e: React.MouseEvent<HTMLOptionElement>) => {
                setForm({ ...form, départ: e.currentTarget.value });
                setDisplay({...display, depart: false });
              }}
            >
              {el}
            </option>
          ))}
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center border-r-4 border-grey pl-1 ">
        <img src="/assets/icons/map.png" alt="" className="bg-white w-auto h-7 mr-1"/>
        <input
        className="h-12"
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
              onClick={(e:any) => {
                setForm({ ...form, destination: e.currentTarget.value });
                setDisplay({...display, destination: false });
              }}
            >
              {el}
            </option>
          ))}
      </div>

      <input
      className="border-r-4 border-grey pl-1"
        type="date"
        value={form.date}
        style={{ height: "100%"}}
      />
      <select name="1" placeholder="personne" style={{ height: "100%" }} className="w-1/1 border-r-4 border-grey pl-1">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <button style={{ height: "100%" }} className="w-1/1 border-r-4 border-grey pl-1">rechercher</button>
    </div>
  );
};

export default SearchForm;
