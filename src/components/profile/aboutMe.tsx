import "../../styles/profile.css";
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_USER_LOGGED = gql`
  query getUserLogged {
    userLogged {
      id
      username
      password
      firstname
      lastname
      date_of_birth
      email
      phone
      userInfo {
        id
        city
        country
        age
        address
        about {
          id
          animal
          description
          smoke
          chatOption {
            id
            content
          }
          musicOption {
            id
            content
          }
        }
        profilPictureId
      }
      cars {
        carPictures {
          path
          id
        }
        id
        model {
          id
          name
        }
        seat
      }
    }
  }
`;

const AboutMeComponent = () => {
  const token = localStorage.getItem('token');

  const { loading, error, data } = useQuery(GET_USER_LOGGED, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error retrieving user information.</div>;
  }

  const user = data.userLogged;

  return (
    <div className="flex border-2 border-blue-500 p-20 m-20">
      <div className="w-1/2">
        <div className="ProfileInfo">
          <img src="../../../public/assets/images/dot-megachx.jpg" alt="" />
          <p>Username: {user.username}</p>
        </div>
      </div>
      <div className="w-1/2">
        <div className="PersonnalInfo">
          <h3 className="bg-blue-700 text-white">A propos de moi</h3>
          <p>Salut, je m’appelle {user.lastname}, j’ai {user.userInfo.age} ans et j’habite à {user.userInfo.city}.</p>
          <div className="Description mt-2">
            <h4>Description</h4>
            <p>{user.userInfo.about.description}</p>
          </div>
          <div className="Preferences mt-2">
            <h4>Préférences</h4>
            <div className="flex">
              <div>
                <img src="../../../public/assets/icons/music-black.svg" alt="" />  <p>Musique: {user.userInfo.about.musicOption.content}</p>
              </div>
              
              <p>Chat: {user.userInfo.about.chatOption.content}</p>
            </div>
          </div>
          <h3 className="bg-blue-700 text-white">Mes Voitures</h3>
            {user.cars.map((car: any) => (
              <div className="Cars flex" key={car.id}>
                <img src="../../../public/assets/images/dot-megachx.jpg" alt="" />
                <p>Ma voiture est une {car.model.name} qui possède {car.seat} places.</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMeComponent;

