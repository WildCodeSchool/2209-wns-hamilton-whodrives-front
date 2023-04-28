import { useState } from "react";
import { useLocation } from 'react-router-dom';

function ConfirmTrip(props : any) {
  const [prix, setPrix] = useState(50);
  const [commentaire, setCommentaire] = useState("");

  const location = useLocation();
  const data = location.state;


  const LocationField = {
    depart: data.depart,
    arrivee: data.arrivee,
    date: data.date,
    heure: data.heuresss,
    nombrePersonnes: data.nombrePersonnes,
  }

  const handlePriceChange = (event: any) => {
    setPrix(parseInt(event.target.value));
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
  <div className="mx-auto sm:w-3/5 lg:w-2/5 xl:w-1/5">
    <h2 className="text-lg font-semibold mb-4 text-center">Mon trajet</h2>
    <div className="flex flex-wrap items-center justify-center space-x-2 mb-4">
      <span className="font-semibold">{LocationField.depart}</span>
      <span>&rarr;</span>
      <span className="font-semibold">{LocationField.arrivee}</span>
      <span className="mx-2">|</span>
      <span>{LocationField.date}</span>
      <span className="mx-2">-</span>
      <span>{LocationField.heure}</span>
      <span className="mx-2">|</span>
      <span>{LocationField.nombrePersonnes} passagers</span>
    </div>
    <div className="flex items-center mb-4 justify-center">
      <button
        className="bg-gray-200 text-gray-500 rounded-full px-2 py-1 mr-2"
        onClick={() => setPrix(Math.max(0, prix - 20))}
      >
        -
      </button>
      <input
        type="number"
        value={prix}
        onChange={handlePriceChange}
        className="w-16 text-center"
      />
      <button
        className="bg-gray-200 text-gray-500 rounded-full px-2 py-1 ml-2"
        onClick={() => setPrix(prix + 20)}
      >
        +
      </button>
    </div>
    <div className="flex flex-col mb-4">
      <label htmlFor="commentaire">Commentaire</label>
      <textarea
        id="commentaire"
        value={commentaire}
        onChange={(e) => setCommentaire(e.target.value)}
        className="border border-gray-300 rounded-md p-2"
      />
    </div>
    <div className="text-center">
      <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
        Publier
      </button>
    </div>
  </div>
</div>

  );
}

export default ConfirmTrip;
