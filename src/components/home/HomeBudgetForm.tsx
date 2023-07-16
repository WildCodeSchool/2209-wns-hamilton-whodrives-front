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
    <div className="flex flex-col items-center gap-5 py-10 mx-6 md:mx-auto md:w-3/5 bg-lightBlue my-14">
      <img
        src="/assets/images/brown-car.png"
        alt="background"
        className="w-1/4"
      />
      <p className="text-center text-white pressStart2p-text">
        Envie de partir sur un coup de tête ?
      </p>
      <div className="flex flex-col md:bg-white md:flex-row">
        <div className="flex flex-row px-2 mb-4 bg-white border-r-2 md:bg-transparent">
          <img src="/assets/icons/euro-grey.svg" alt="arrow" className="w-5" />
          <input
            className="w-20"
            placeholder="Budget"
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            value={form.budget}
          />
        </div>
        <div className="flex flex-row px-2 mb-4 bg-white border-r-2 md:bg-transparent">
          <input
            type="date"
            placeholder="Date"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            value={form.date}
          />
        </div>
        <button className="p-2 text-xs green-button">Rechercher</button>
      </div>
    </div>
  );
}
