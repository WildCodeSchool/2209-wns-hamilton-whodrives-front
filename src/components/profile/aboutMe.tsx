import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { GET_USER_LOGGED } from '../../queryMutation/query';


const AboutMeComponent = () => {
  const navigate = useNavigate();

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

  const { loading, error, data } = useQuery(GET_USER_LOGGED);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error retrieving user information.</div>;
  }

  const user = data.userLogged;
  console.log('ici la voiture', user.car)
  return (
    <div className="flex border-2 border-blue-500 p-8 m-20">
      <div className="w-1/3 mr-5">
        <img src="/assets/images/dot-megachx.jpg" alt="" className="w-64" />
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
              <img src="/assets/images/yellow-car.png" alt="" className="w-64"  onClick={() => handleClickAddPicture(car.id)} />
              <p>
                Ma voiture est une <span className="text-validBlue">{car.model.name}</span> qui possède <span className="text-validBlue">{car.seat}</span> places.
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AboutMeComponent;
