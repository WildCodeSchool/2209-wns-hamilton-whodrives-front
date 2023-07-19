import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import { GET_USER_LOGGED } from '../../queryMutation/query';

const ADD_PROFILE_PICTURE_MUTATION = gql`
mutation AddProfilePicture($pictureId: ID!, $file: Upload!) {
  addProfilePicture(pictureID: $pictureId, file: $file) {
    id
    path
  }
}
`;

const AboutMeComponent = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const [addProfilePicture] = useMutation(ADD_PROFILE_PICTURE_MUTATION);



  const handleClick = () => {
    navigate('/userInfo');
  };
  const handleClickAbout = () => {
    navigate('/userInfo/about');
  };
  const handleClickCar = () => {
    navigate('/userInfo/Car');
  };
  const handleClickAddPicture = (carId: string) => {
    localStorage.setItem('selectedCarId', carId);
    navigate('/userInfo/AddPictureCar');
  };

  const { loading, error, data, refetch } = useQuery(GET_USER_LOGGED);
  useEffect(() => {
    refetch()
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error retrieving user information.</div>;
  }
  const backendUrl = "http://localhost:4000/cars-images/";
  const user = data.userLogged;
  // const testdata = JSON.stringify(user);
  // alert(testdata)

  const handleFileSelect = (event:any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) return;
      console.log('Uploading file...', user.userInfo.id);
      const { data } = await addProfilePicture({
        variables: { pictureId: user.userInfo.id, file: selectedFile },
      });
      console.log('Picture uploaded:', data.addProfilePicture);
    } catch (error) {
      console.error('Error uploading picture:', error);
    }
  };

  return (
    <div className="flex border-2 border-blue-500 p-8 m-20">
      <div className="w-1/3 mr-5">
        {/* File upload zone */}
        <input type="file" accept="image/*" onChange={handleFileSelect} />
        <button onClick={handleUpload}>Upload Picture</button>
        {/* Replace the img tag with a preview of the selected picture (if available) */}
        {selectedFile && (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt=""
            className="w-64"
          />
        )}
        <p>{user.username}</p>
      </div>
      <div className="w-2/3">
        <h3 className="bg-blue-700 text-white">A propos de moi</h3>
        {user.userInfo !== null && (
          <>
            <p>
              Salut, je m’appelle
              <span className="text-validBlue"> {user.lastname}</span>, j’ai <span className="text-validBlue">{user.userInfo.age} </span> ans et j’habite à <span className="text-validBlue">{user.userInfo.city}</span> .
            </p>
            {user.userInfo.about !== null ? (
              <>
                <h4>Description</h4>
                <p>{user.userInfo.about.description}</p>
                <h4>Préférences</h4>
                <div className="flex">
                  <div className="flex mr-5">
                    <img src="/assets/icons/chat-black.svg" alt="" />
                    <p>{user.userInfo.about.chatOption.content}</p>
                  </div>
                  <div className="flex">
                    <img src="/assets/icons/music-black.svg" alt="" />
                    <p>{user.userInfo.about.musicOption.content}</p>
                  </div>
                </div>
                <div className="flex">
                  <div>
                    {user.userInfo.about.animal === true ? (
                      <img src="/assets/icons/animal-blue.svg" alt="" />
                    ) : (
                      <img src="/assets/icons/animal-grey.svg" alt="" />
                    )}
                  </div>
                  <div className="ml-5">
                    {user.userInfo.about.smoke === true ? (
                      <img src="/assets/icons/wind-blue.svg" alt="" />
                    ) : (
                      <img src="/assets/icons/wind-grey.svg" alt="" />
                    )}
                  </div>
                </div>
              </>
            ) : (
              <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border m-1" onClick={handleClickAbout}>
                Ajouter vos préférences
              </button>
            )}
          </>
        )}
        {user.userInfo === null && (
          <>
            <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border m-1" onClick={handleClick}>
              Ajouter vos informations
            </button>
          </>
        )}
        <h3 className="bg-blue-700 text-white">Ma Voiture</h3>
        {user.cars.length === 0 ? (
          <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border m-1" onClick={handleClickCar}>
            Ajouter une voiture
          </button>
        ) : (

          user.cars.map((car: any) => (
            <div className="Cars flex" key={car.id}>
              
              {car.carPictures?.map((picture: any) => (
                <img src={picture.path ? backendUrl + picture.path : "/assets/images/yellow-car.png"} alt="" className="w-64" key={picture.id} onClick={() => handleClickAddPicture(car.id)} />
              ))}
              <p>
                Ma voiture est une <span className="text-validBlue">{car.model?.name}</span> qui possède <span className="text-validBlue">{car.seat}</span> places.
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AboutMeComponent;