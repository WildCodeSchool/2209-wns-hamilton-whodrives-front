import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";

import { ADD_PROFILE_PICTURE } from "../../queryMutation/mutations";
import { GET_ID_USERINFO } from "../../queryMutation/query";

export default function AddUserPicturePage() {
  const [file, setFile] = useState<File | null>(null);
  const { data } = useQuery(GET_ID_USERINFO); // Récupérer l'ID userInfoId

  const [addProfilePicture] = useMutation(ADD_PROFILE_PICTURE);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || !data || !data.getUserLogged?.userInfo?.id) return;
    try {
      const formData = new FormData();
      formData.append("userInfoId", data.getUserLogged.userInfo.id);
      formData.append("file", file);
      await addProfilePicture({
        variables: {
          userInfoId: data.getUserLogged.userInfo.id,
          file: formData.get("file")!,
        },
      });
      setFile(null);
      alert("User picture added successfully");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    console.log("selectedFile", selectedFile);
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
        {/* Le champ ID utilisateur est supprimé, il sera récupéré automatiquement */}
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
