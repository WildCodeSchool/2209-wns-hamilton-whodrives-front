import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  CREATE_CAR_MUTATION,
  UPDATE_CAR_MUTATION,
} from "../../queryMutation/mutations";
import { GET_CAR_BRANDS, GET_CAR_USER_LOGGED } from "../../queryMutation/query";

interface Car {
  id: number;
  seat: number;
  brand: {
    id: number;
    name: string;
  };
  carPictures: {
    id: number;
    path: string;
  }[];
}

interface Brand {
  id: number;
  name: string;
}

export default function AddCarPage() {
  const [seat, setSeat] = useState<number>(0);
  const [brandId, setBrandId] = useState<number | string>("0");
  const [carPictures, setCarPictures] = useState<File[]>([]);

  const navigate = useNavigate();

  const { loading, error, data } = useQuery<{ getBrands: Brand[] }>(
    GET_CAR_BRANDS
  );
  console.log(data);
  const {
    loading: carLoading,
    error: carError,
    data: carData,
  } = useQuery<{ getUserLogged: { cars: Car[] } }>(GET_CAR_USER_LOGGED);

  const updateCarId = carData?.getUserLogged.cars[0]?.id;
  console.log("id", updateCarId);

  const [createCar, { loading: mutationLoading, error: mutationError }] =
    useMutation<{ createCar: Car }>(CREATE_CAR_MUTATION, {
      onCompleted: (data) => {
        toast.success("Votre voiture a été ajoutée avec succès !");
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
      toast.success("Votre voiture a été mise à jour avec succès !");
      navigate("/profile");
    },
    onError: (error) => {
      toast.error(
        `Erreur lors de la mise à jour de votre voiture : ${error.message}`
      );
    },
  });

  useEffect(() => {
    if (!carLoading && carData && carData.getUserLogged.cars.length > 0) {
      const carInfo = carData.getUserLogged.cars[0];
      setSeat(carInfo.seat);
      setBrandId(carInfo.brand.id);
    }
  }, [carLoading, carData]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (seat > 0 && parseInt(brandId.toString()) > 0) {
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
            brandId: parseInt(brandId.toString()),
          },
        });
      } else {
        createCar({
          variables: {
            seat: parseInt(seat.toString()),
            brandId: parseInt(brandId.toString()),
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
      {loading && <p>Loading Brands...</p>}
      {error && (
        <p className="text-red-500">Error loading Brands: {error.message}</p>
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
                value={brandId}
                onChange={(e) => setBrandId(parseInt(e.target.value))}
              >
                <option value={0}></option>
                {data.getBrands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
              <label className="mb-2 font-semibold">Nombre de places</label>
              <input
                type="number"
                className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
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
