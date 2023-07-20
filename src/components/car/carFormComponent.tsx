import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CAR_MODELS } from '../../queryMutation/query';
import { CREATE_CAR_MUTATION } from '../../queryMutation/mutations';

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
  
  const AddCarForm: React.FC = () => {
    const [seat, setSeat] = useState<number>(0);
    const [modelId, setModelId] = useState<number>(0);
    const [carPictures, setCarPictures] = useState<File[]>([]);
  
    const { loading, error, data } = useQuery<{ Models: Model[] }>(GET_CAR_MODELS);
  
    const [createCar, { loading: mutationLoading, error: mutationError }] = useMutation<{ createCar: Car }>(
      CREATE_CAR_MUTATION,
      {
        onCompleted: (data) => {
          console.log('Car created:', data.createCar);
          // Vous pouvez exécuter une action supplémentaire ici après la création de la voiture
        },
        onError: (error) => {
          console.error('Car creation error:', error);
          // Gérez les erreurs ici si nécessaire
        },
      }
    );
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
  
      // Vérifiez si les valeurs sont valides avant d'appeler la mutation
      if (seat > 0 && modelId > 0) {
        const pictures = await Promise.all(
          carPictures.map((file) =>
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
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const fileList = Array.from(event.target.files);
        setCarPictures(fileList);
      }
    };
  
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-md w-full px-4 py-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Ajouter une voiture</h2>
          {loading && <p>Loading models...</p>}
          {error && <p className="text-red-500">Error loading models: {error.message}</p>}
          {mutationLoading && <p>Creating car...</p>}
          {mutationError && <p className="text-red-500">Error creating car: {mutationError.message}</p>}
          {data && (
            <form onSubmit={handleSubmit}>
              <label className="block mb-4">
                <span className="text-gray-700">Seat:</span>
                <input
                  type="number"
                  className="form-input mt-1 block w-full"
                  value={seat}
                  onChange={(e) => setSeat(parseInt(e.target.value))}
                />
              </label>
              <label className="block mb-4">
                <span className="text-gray-700">Model:</span>
                <select
                  className="form-select mt-1 block w-full"
                  value={modelId}
                  onChange={(e) => setModelId(parseInt(e.target.value))}
                >
                  <option value={0}>Select a model</option>
                  {data.Models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Créer la voiture
              </button>
            </form>
          )}
        </div>
      </div>
    );
  };
  
  export default AddCarForm;