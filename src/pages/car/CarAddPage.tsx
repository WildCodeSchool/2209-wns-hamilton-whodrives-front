import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CAR_MODELS } from "../../queryMutation/query";
import { CREATE_CAR_MUTATION } from "../../queryMutation/mutations";

interface Car {
  id: number;
  seat: number;
  model: {
    id: number;
    name: string;
  };
  carPictures: {
    id: number;
    path: string;
  }[];
}
interface Model {
  id: number;
  name: string;
}

export default function AddCarPage() {
  const [seat, setSeat] = useState<number>(0);
  const [modelId, setModelId] = useState<number>(0);
  const [carPictures, setCarPictures] = useState<File[]>([]);

  const { loading, error, data } = useQuery<{ Models: Model[] }>(
    GET_CAR_MODELS
  );

  const [createCar, { loading: mutationLoading, error: mutationError }] =
    useMutation<{ createCar: Car }>(CREATE_CAR_MUTATION, {
      onCompleted: (data) => {
        console.log("Car created:", data.createCar);
        // Vous pouvez exécuter une action supplémentaire ici après la création de la voiture
      },
      onError: (error) => {
        console.error("Car creation error:", error);
        // Gérez les erreurs ici si nécessaire
      },
    });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Vérifiez si les valeurs sont valides avant d'appeler la mutation
    if (seat > 0 && modelId > 0) {
      const pictures = await Promise.all(
        carPictures.map(
          (file) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve(reader.result);
              };
              reader.onerror = reject;
              reader.readAsDataURL(file);
            })
        )
      );

      createCar({
        variables: {
          seat: parseInt(seat.toString()),
          modelId: parseInt(modelId.toString()),
          pictures,
        },
      });
    }
  };

  const BackToProfile = () => {
    window.history.back();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileList = Array.from(event.target.files);
      setCarPictures(fileList);
    }
  };

  return (
    <div className="w-full flex-grow min-h-[calc(100vh-10rem)] pt-6">
      <h1 className="mb-4 text-center text-layoutBlue">Ma voiture</h1>
      {loading && <p>Loading models...</p>}
      {error && (
        <p className="text-red-500">Error loading models: {error.message}</p>
      )}
      {mutationLoading && <p>Creating car...</p>}
      {mutationError && (
        <p className="text-red-500">
          Error creating car: {mutationError.message}
        </p>
      )}
      {data && (
        <form
          onSubmit={handleSubmit}
          className="grid w-5/6 p-8 m-auto my-4 border-2 md:w-1/2 border-validBlue"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
              <label className="mb-2 font-bold">
                Quelle est la marque de votre voiture ?
              </label>
              <select
                className="px-4 py-2 border"
                value={modelId}
                onChange={(e) => setModelId(parseInt(e.target.value))}
              >
                <option value={0}></option>
                {data.Models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
              <label className="mb-2 font-bold">Nombre de places</label>
              <input
                type="number"
                className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
                value={seat}
                onChange={(e) => setSeat(parseInt(e.target.value))}
              />
            </div>
          </div>
        </form>
      )}
      <div className="flex justify-center">
        <button
          type="button"
          className="mb-2 font-bold"
          onClick={() => BackToProfile()}
        >
          <p className="font-bold text-whodrivesGrey hover:text-validBlue">
            Retour
          </p>
        </button>
        <button type="submit" className="p-4">
          <p className="p-2 text-xs green-button">Valider</p>
        </button>
      </div>
    </div>
  );
}
