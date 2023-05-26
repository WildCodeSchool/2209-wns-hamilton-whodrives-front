import { useState } from "react";

export default function HomeBudgetFormComponent(): JSX.Element {
  const today = new Date().toLocaleDateString("en-us");

  type FormState = {
    budget: string;
    date: string;
  };

  const [form, setForm] = useState<FormState>({
    budget: "",
    date: today,
  });

  return (
    <div className="flex flex-col items-center w-3/5 gap-5 py-10 mx-auto bg-lightBlue my-14">
      <img
        src="/assets/images/brown-car.png"
        alt="background"
        className="w-1/4"
      />
      <p className="text-white pressStart2p-text">
        Envie de partir sur un coup de tête ?
      </p>
      <div className="flex flex-row bg-white">
        <div className="flex flex-row px-2 my-1 border-r-2">
          <img src="/assets/icons/euro-grey.svg" alt="arrow" className="w-5" />
          <input
            className="w-20"
            placeholder="Budget"
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            value={form.budget}
          />
        </div>
        <div className="flex flex-row px-2">
          <input
            type="date"
            placeholder="Date"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            value={form.date}
          />
        </div>
        <button className="p-2 text-white border-2 border-black border-solid text-xxs bg-whodrivesGreen pressStart2p-text">
          Rechercher
        </button>
      </div>
    </div>
  );
}
