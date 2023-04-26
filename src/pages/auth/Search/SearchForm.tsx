import React from "react";
import { useEffect, useState, useRef } from "react";
import "./Search.css";
import { getValue } from "@testing-library/user-event/dist/utils";

const SearchForm: React.FC = () => {
  const today = new Date().toLocaleDateString("en-us", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  console.log(today);

  interface FormState {
    départ: string;
    déstination: string;
    date: string;
    personnes: string;
  }

  const [form, setForm] = useState<FormState>({
    départ: "départ",
    déstination: "destination",
    date: today,
    personnes: "",
  });

  const [word, setWord] = useState([]);
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(false);
  const getcity = async () => {
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
    if (word.length === 0) {
      setData([]);
      getcity();
    } else {
      getcity();
    }
  }, [word]);
  useEffect(() => {
    if (data.length === 0) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }, [word]);

  const handleChange = (e: any) => {
    setWord(e.target.value);
  };


  console.log(data);
  console.log(word);
  console.log(form);

  return (
    <div
      style={{
        position: "absolute",
        height: "7vh",
        backgroundColor: "green",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="depart"
          style={{ height: "100%", borderRight: "black solid" }}
        />
        {display &&
          data.map((el) => (
            <option
              key={el}
              value={el}
              onClick={(e: React.MouseEvent<HTMLOptionElement>) =>
                setForm({ ...form, départ: e.currentTarget.value })
              }
            >
              {el}
            </option>
          ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="destination"
          style={{ height: "100%", borderRight: "black solid" }}
        />
        {display &&
          data.map((el) => (
            <option
              key={el}
              value={el}
              onClick={(e: React.MouseEvent<HTMLOptionElement>) =>
                {setForm({ ...form, déstination: e.currentTarget.value })}
              }
            >
              {el}
            </option>
          ))}
      </div>

      <input
        type="date"
        value={form.date}
        style={{ height: "100%", borderRight: "black solid" }}
      />
      <select name="1" placeholder="personne" style={{ height: "100%" }}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <button style={{ height: "100%" }}>rechercher</button>
      <img src="logo512.png" alt="" />
    </div>
  );
};

export default SearchForm;
