import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";

export const ADD_CAR_PICTURE = gql`
 mutation AddPicture($carId: ID!, $file: Upload!) {
  addPicture(carId: $carId, file: $file) {
    id
    path
  }
}
`;

const AddCarPictureForm: React.FC = () => {
  const [carId, setCarId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const [addCarPicture] = useMutation<{ addCarPicture: { success: boolean } }>(
    ADD_CAR_PICTURE,
    {
      context: {
        headers: {
          'Content-Type': 'multipart/form-data',
          'apollo-require-preflight': true,
        },
      },
    }
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('carId', carId);

      await addCarPicture({
        variables: {
          carId,
          file: formData.get('file')!,
        },
      });
      setCarId("");
      setFile(null);
      alert("Car picture added successfully");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label>
        Car ID:
        <input
          type="text"
          value={carId}
          onChange={(event) => setCarId(event.target.value)}
        />
      </label>
      <br />
      <label>
        Picture:
        <input type="file" onChange={handleFileChange} />
      </label>
      <br />
      <button type="submit">Add Picture</button>
    </form>
  );
};

export default AddCarPictureForm;
