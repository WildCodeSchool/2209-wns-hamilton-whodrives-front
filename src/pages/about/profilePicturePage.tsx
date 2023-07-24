

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";

const ADD_PROFILE_PICTURE = gql`
  mutation AddProfilePicture($userInfoId: ID!, $file: Upload!) {
    addProfilePicture(userInfoId: $userInfoId, file: $file) {
      id
      path
    }
  }
`;




export default function AddUserPicturePage() {
  const [userInfoId, setUserInfoId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const [addCarPicture] = useMutation(ADD_PROFILE_PICTURE);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("user", userInfoId);
      formData.append("file", file);
      await addCarPicture({
        variables: {
          userInfoId,
          file: formData.get("file")!,
        },
      });
      setUserInfoId("");
      setFile(null);
      alert("User picture added successfully");
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
    <form onSubmit={handleSubmit}>
      <label>
        User ID:
        <input
          type="text"
          value={userInfoId}
          onChange={(event) => setUserInfoId(event.target.value)}
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
}