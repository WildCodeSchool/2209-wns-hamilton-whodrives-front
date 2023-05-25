import React from "react";

function FilterSearchComponent() {
  return (
    <div className="w-1/3 flex flex-col border">
<h3>FILTRES</h3>
<button className="justify-start flex mb-1">Reset</button>
<h3>TRIER PAR</h3>
<div className="w-1/1 flex-wrap justify-between">
<button className="border  min-w-45% p-1 mb-1" >Date</button>
        <button className=" min-w-45% mb-1">Disponibilité</button>
        <button className="  min-w-45%  mb-1">Prix</button>
        <button className="  min-w-45% p-1 mb-1">Notes</button>
</div>

        <h3>HEURE DE DEPART</h3>
      <div className="flex flex-wrap justify-between w-1/1">
        <button className="border  min-w-50% p-1 mb-1" >06:01-12:00</button>
        <button className="border  min-w-50% p-1 mb-1">12:01-18:00</button>
        <button className="border  min-w-50% p-1 mb-1">18:01-00:00</button>
        <button className="border  min-w-50% p-1 mb-1">00:01-06:00</button>
      </div>
    </div>
  );
}

export default FilterSearchComponent;
