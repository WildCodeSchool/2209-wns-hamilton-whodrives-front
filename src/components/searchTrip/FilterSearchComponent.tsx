import React from "react";

function FilterSearchComponent() {
  return (
    <div className="w-1/3 h-5/6 flex flex-col border-r-4 pr-5">
      <h3 className="font-semibold mb-2">FILTRES</h3>
      <button className="justify-start flex mb-1 hover:text-validBlue">
        Reset
      </button>
      <h3 className="font-semibold mb-2">TRIER PAR</h3>
      <div className="w-1/1 flex-wrap justify-between ">
        <button className="hover:text-validBlue  w-1/2  mb-2 text-left">
          Date
        </button>
        <button className="hover:text-validBlue  w-1/2 mb-2 text-left">
          Disponibilité
        </button>
        <button className="hover:text-validBlue  w-1/2  mb-2 text-left">
          Prix
        </button>
        <button className="hover:text-validBlue  w-1/2  mb-2 text-left">
          Notes
        </button>
      </div>

      <h3 className="font-semibold mb-2">HEURE DE DEPART</h3>
      <div className="flex flex-wrap justify-between w-1/1">
        <button className="border  w-[45%] p-1 mb-4 bg-whodrivesGrey font-medium hover:bg-validBlue hover:text-white">
          06:01-12:00
        </button>
        <button className="border  w-[45%] p-1 mb-4 bg-whodrivesGrey font-medium hover:bg-validBlue hover:text-white">
          12:01-18:00
        </button>
        <button className="border w-[45%] p-1 mb-4 bg-whodrivesGrey font-medium hover:bg-validBlue hover:text-white">
          18:01-00:00
        </button>
        <button className="border  w-[45%] p-1 mb-4 bg-whodrivesGrey font-medium hover:bg-validBlue hover:text-white">
          00:01-06:00
        </button>
      </div>

      <h3 className="mb-2 font-semibold">PREFERENCES</h3>
      <div className="flex flex-row">
        <img src="/assets/icons/wind-black.svg" alt="" />
        <img src="/assets/icons/animal-blue.svg" alt="" />
        <img src="/assets/icons/music-blue.svg" alt="" />
      </div>
    </div>
  );
}

export default FilterSearchComponent;
