import { useEffect, useState } from "react";

function ConfirmReturnTrip({
  returnTrip,
  handleConfirmreturnTripData,
  BackToPreviousStage,
}: any) {
  useEffect(() => {
    ifTripDataIsComplete();
  }, []);

  function ifTripDataIsComplete() {
    if (returnTrip.price && returnTrip.description) {
      setPrice(returnTrip.price);
      setDescription(returnTrip.description);
    }
  }

  const [price, setPrice] = useState<number>(50);
  const [description, setDescription] = useState<string>("");

  const LocationField = {
    departure: returnTrip.departure,
    arrival: returnTrip.arrival,
    date: returnTrip.date,
    time: returnTrip.time,
    passengers: returnTrip.passengers,
    price: returnTrip.price,
    description: returnTrip.description,
  };
  const handlePriceChange = (event: any) => {
    setPrice(parseInt(event.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mx-auto sm:w-3/5 lg:w-2/5 xl:w-1/5">
        <h2 className="mb-4 text-lg font-semibold text-center">Mon trajet</h2>
        <div className="flex flex-wrap items-center justify-center mb-4 space-x-2">
          <span className="font-semibold">{LocationField.departure}</span>
          <span>&rarr;</span>
          <span className="font-semibold">{LocationField.arrival}</span>
          <span className="mx-2">|</span>
          <span>{LocationField.date}</span>
          <span className="mx-2">-</span>
          <span>{LocationField.time}</span>
          <span className="mx-2">|</span>
          <span>{LocationField.passengers} passagers</span>
        </div>
        <div className="flex items-center justify-center mb-4">
          <button
            className="px-2 py-1 mr-2 text-gray-500 bg-gray-200 rounded-full"
            onClick={() => setPrice(Math.max(0, price - 20))}
          >
            -
          </button>
          <input
            type="number"
            value={price}
            onChange={handlePriceChange}
            className="w-16 text-center"
          />
          <button
            className="px-2 py-1 ml-2 text-gray-500 bg-gray-200 rounded-full"
            onClick={() => setPrice(price + 10)}
          >
            +
          </button>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="commentaire">Commentaire</label>
          <textarea
            id="commentaire"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="text-center">
          <button
            className="px-4 py-2 mr-2 text-white rounded-md bg-whodrivesGrey"
            onClick={() => BackToPreviousStage()}
          >
            retour
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white rounded-md bg-whodrivesGrey"
            onClick={() => handleConfirmreturnTripData({ price, description })}
          >
            suivant
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmReturnTrip;
