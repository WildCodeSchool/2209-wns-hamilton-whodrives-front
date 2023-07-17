import { useEffect, useState } from "react";

function ConfirmTrip({
  trip,
  handleConfirmTripData,
  BackToPreviousStage,
}: any) {
  useEffect(() => {
    ifTripDataIsComplete();
  }, []);

  function ifTripDataIsComplete() {
    if (trip.price && trip.description) {
      setPrice(trip.price);
      setDescription(trip.description);
    }
  }

  const [price, setPrice] = useState<number>(1);
  const [description, setDescription] = useState<string>("");

  const LocationField = {
    departure: trip.departure,
    arrival: trip.arrival,
    date: trip.date,
    time: trip.time,
    passengers: trip.passengers,
    price: trip.price,
    description: trip.description,
  };
  const handlePriceChange = (event: any) => {
    setPrice(parseInt(event.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="w-3/5 lg:w-2/5">
        <div className="flex flex-wrap items-center justify-center p-4 mb-4 border-2 border-black">
          <span className="font-semibold">{LocationField.departure}</span>
          <img
            className="w-4 mx-4"
            src="/assets/icons/arrow-right-black.svg"
            alt="arrow icon"
          />
          <span className="font-semibold">{LocationField.arrival}</span>
          <span className="mx-4">|</span>
          <span>{LocationField.date}</span>
          <span className="mx-4">-</span>
          <span>{LocationField.time}</span>
          <span className="mx-4">|</span>
          <span>{LocationField.passengers} places disponibles</span>
        </div>
        <div className="flex flex-col items-center justify-center mb-4">
          <label htmlFor="price">Veuillez renseigner votre prix</label>
          <div className="flex flex-row">
            <button
              className="px-4"
              onClick={() => setPrice(Math.max(1, price - 1))}
            >
              <img src="/assets/icons/minus.svg" alt="minus icon" />
            </button>
            <div className="flex font-bold">
              <input
                className="w-10 text-center"
                type="number"
                value={price}
                onChange={handlePriceChange}
              />
              <p className="">€</p>
            </div>
            <button className="px-4" onClick={() => setPrice(price + 1)}>
              <img src="/assets/icons/plus.svg" alt="minus icon" />
            </button>
          </div>
        </div>
        <div className="flex flex-col mb-4 ">
          <label className="items-center justify-center" htmlFor="commentaire">
            Commentaire
          </label>
          <textarea
            id="commentaire"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border border-black"
          />
        </div>
        <div className="text-center">
          <button className="p-4" onClick={() => BackToPreviousStage()}>
            <p className="font-bold text-whodrivesGrey hover:text-validBlue">
              Retour
            </p>
          </button>
          <button
            type="submit"
            className="p-4"
            onClick={() => handleConfirmTripData({ price, description })}
          >
            <p className="p-2 text-xs green-button">Suivant</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmTrip;
