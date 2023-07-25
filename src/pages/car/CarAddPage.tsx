import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  CREATE_CAR_MUTATION,
  UPDATE_CAR_MUTATION,
} from "../../queryMutation/mutations";
import { GET_CAR_MODELS, GET_CAR_USER_LOGGED } from "../../queryMutation/query";

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
  const [modelId, setModelId] = useState<number | string>("0");
  const [carPictures, setCarPictures] = useState<File[]>([]);

  const navigate = useNavigate();

  const { loading, error, data } = useQuery<{ Models: Model[] }>(
    GET_CAR_MODELS
  );
  const {
    loading: carLoading,
    error: carError,
    data: carData,
  } = useQuery<{ userLogged: { cars: Car[] } }>(GET_CAR_USER_LOGGED);

  const updateCarId = carData?.userLogged.cars[0]?.id;

  const [createCar, { loading: mutationLoading, error: mutationError }] =
    useMutation<{ createCar: Car }>(CREATE_CAR_MUTATION, {
      onCompleted: (data) => {
        toast.success("Votre voiture a été ajoutée avec succès !", {
          autoClose: 1000,
        });
        navigate("/profile");
      },
      onError: (error) => {
        toast.error(
          `Erreur lors de l'ajout de votre voiture : ${error.message}`
        );
      },
    });

  const [updateCar] = useMutation<{ updateCar: Car }>(UPDATE_CAR_MUTATION, {
    onCompleted: (data) => {
      toast.success("Votre voiture a été mise à jour avec succès !", {
        autoClose: 1000,
      });
      navigate("/profile");
    },
    onError: (error) => {
      toast.error(
        `Erreur lors de la mise à jour de votre voiture : ${error.message}`
      );
    },
  });

  useEffect(() => {
    if (!carLoading && carData && carData.userLogged.cars.length > 0) {
      const carInfo = carData.userLogged.cars[0];
      setSeat(carInfo.seat);
      setModelId(carInfo.model.id);
    }
  }, [carLoading, carData]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (seat > 0 && parseInt(modelId.toString()) > 0) {
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

      if (updateCarId) {
        updateCar({
          variables: {
            updateCarId,
            seat,
            modelId: parseInt(modelId.toString()),
          },
        });
      } else {
        createCar({
          variables: {
            seat: parseInt(seat.toString()),
            modelId: parseInt(modelId.toString()),
            pictures,
          },
        });
      }
    }
  };

  const BackToProfile = () => {
    window.history.back();
  };

  return (
    <div className="w-full flex-grow min-h-[calc(100vh-10rem)] pt-5">
      <h1 className="mb-4 text-center text-layoutBlue">Ma voiture</h1>
      {loading && <p>Loading models...</p>}
      {error && (
        <p className="text-red-500">Error loading models: {error.message}</p>
      )}
      {carLoading && <p>Loading car data...</p>}
      {carError && (
        <p className="text-red-500">
          Error loading car data: {carError.message}
        </p>
      )}
      {mutationLoading && <p>Creating car...</p>}
      {mutationError && (
        <p className="text-red-500">
          Error creating car: {mutationError.message}
        </p>
      )}
      {data && (
        <div className="grid w-5/6 p-8 m-auto my-4 border-2 md:w-1/2 border-validBlue">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
              <label className="mb-2 font-semibold">
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
              <label className="mb-2 font-semibold">Nombre de places</label>
              <input
                type="number"
                className="w-full px-4 py-2 mb-2 border border-gray-300 focus:outline-validBlue"
                value={seat}
                onChange={(e) => setSeat(parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>
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
        <button type="submit" className="p-4" onClick={handleSubmit}>
          <p className="p-2 text-xs green-button">Valider</p>
        </button>
      </div>
    </div>
  );
}
