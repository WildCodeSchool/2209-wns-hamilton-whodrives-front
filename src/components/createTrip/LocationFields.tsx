import { useState } from "react";
import ConfirmPrice from "../../components/createTrip/ConfirmPrice";

function LocationField() {
  const [depart, setDepart] = useState("");
  const [arrivee, setArrivee] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [nombrePersonnes, setNombrePersonnes] = useState("");

  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      <h2 className="text-lg font-semibold text-center mb-4">Je publie un trajet</h2>
  <div className="bg-lightBlue p-8 mx-auto w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/5" >
    <div className="flex flex-col space-y-2">
      <label className="text-center " htmlFor="depart">Départ</label>
      <input
        type="text"
        id="depart"
        value={depart}
        onChange={(e) => setDepart(e.target.value)}
        className="border border-gray-300  p-2"
      />
    </div>
    <div className="flex flex-col space-y-2">
      <label className="text-center " htmlFor="arrivee">Arrivée</label>
      <input
        type="text"
        id="arrivee"
        value={arrivee}
        onChange={(e) => setArrivee(e.target.value)}
        className="border border-gray-300 p-2"
      />
    </div>
    <div className="flex flex-col sm:flex-row sm:space-x-4">
  <div className="flex flex-col space-y-2 sm:w-1/2 sm:flex-1"> 
    <label className="text-center" htmlFor="date">Date</label>
    <input
      type="date"
      id="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="border border-gray-300 p-2"
    />
  </div>
  <div className="flex flex-col space-y-2 sm:w-1/2 sm:flex-1"> 
    <label className="text-center" htmlFor="heure">Heure</label>
    <input
      type="time"
      id="heure"
      value={heure}
      onChange={(e) => setHeure(e.target.value)}
      className="border border-gray-300 p-2"
    />
  </div>
</div>

    <div className="flex flex-col space-y-2 ">
      <label className="text-center" htmlFor="nombrePersonnes">Nombre de personnes</label>
      <input
        type="number"
        id="nombrePersonnes"
        value={nombrePersonnes}
        onChange={(e) => setNombrePersonnes(e.target.value)}
        className="w-1/6 border border-gray-300 p-2 justify-center mx-auto"
      />
    </div>
   
  </div>
  <div className="flex justify-center">
      <button className="bg-blue-500 text-white py-2 px-4 mt-6">
        Suivant
      </button>
    </div>
</div>

  );
}

export default LocationField
