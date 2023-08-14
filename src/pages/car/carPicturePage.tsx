import { useMutation, useQuery } from "@apollo/client";
import { GET_ID_CAR , ADD_CAR_PICTURE} from "../../queryMutation/mutations";
import { gql } from "@apollo/client/core";
import { useState } from "react";




export default function AddCarPicturePage() {
  const [file, setFile] = useState<File | null>(null);
  const { data } = useQuery(GET_ID_CAR); // Fetching the car ID

  const [addCarPicture] = useMutation(ADD_CAR_PICTURE);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || !data || !data.getUserLogged?.cars?.[0]?.id) return;
    try {
      const formData = new FormData();
      formData.append("carId", data.getUserLogged.cars[0].id);
      formData.append("file", file);
      await addCarPicture({
        variables: {
          carId: data.getUserLogged.cars[0].id,
          file: formData.get("file")!,
        },
      });
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={handleSubmit}>
        <label>
          Picture:
          <input type="file" onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit">Add Picture</button>
      </form>
    </div>
  );
}