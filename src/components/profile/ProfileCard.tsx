import { useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { GET_USER_LOGGED } from "../../queryMutation/query";

const ProfileCardComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/userInfo");
  };
  const handleClickAbout = () => {
    navigate("/userInfo/about");
  };
  const handleClickCar = () => {
    navigate("/userInfo/Car");
  };
  const handleClickAddPicture = (carId: string) => {
    localStorage.setItem("selectedCarId", carId);
    navigate("/userInfo/AddPictureCar");
  };

  const { loading, error, data } = useQuery(GET_USER_LOGGED);

  const localhost = "http://localhost:4000/graphql";

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error retrieving user information.</div>;
  }

  const user = data.userLogged;
  return (
    <div className="flex w-5/6 p-8 m-auto my-4 border-2 md:w-1/2 border-validBlue">
      <div className="w-1/4 mr-5">
        <img src="/assets/images/blue.png" alt="profile pic" />
        <p className="font-bold text-center">{user.username}</p>
      </div>
      <div className="w-3/4">
        <h3 className="px-2 py-1 text-white bg-layoutBlue">A propos de moi</h3>
        {user.userInfo !== null && (
          <>
            <p>
              Salut, je m’appelle
              <span className="text-validBlue"> {user.lastname}</span>, j’ai{" "}
              <span className="text-validBlue">{user.userInfo.age} </span> ans
              et j’habite à{" "}
              <span className="text-validBlue">{user.userInfo.city}</span> .
            </p>
            {user.userInfo.about !== null ? (
              <>
                <p className="font-bold">Description</p>
                <p>{user.userInfo.about.description}</p>
                <p className="font-bold">Préférences</p>
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
              <button
                className="px-4 py-2 m-1 font-bold text-white bg-green-500 border hover:bg-blue-700"
                onClick={handleClickAbout}
              >
                Ajouter vos préférences
              </button>
            )}
          </>
        )}
        {user.userInfo === null && (
          <>
            <button
              className="px-4 py-2 m-1 font-bold text-white bg-green-500 border hover:bg-blue-700"
              onClick={handleClick}
            >
              Ajouter vos informations
            </button>
          </>
        )}
        <h3 className="px-2 py-1 text-white bg-layoutBlue">Ma Voiture</h3>
        {user.cars.length === 0 ? (
          <button
            className="px-4 py-2 m-1 font-bold text-white bg-green-500 border hover:bg-blue-700"
            onClick={handleClickCar}
          >
            Ajouter une voiture
          </button>
        ) : (
          user.cars.map((car: any) => (
            <div className="flex Cars" key={car.id}>
              <img
                src={`${localhost}/${car.carPictures.path}`}
                alt=""
                className="w-40 "
                onClick={() => handleClickAddPicture(car.id)}
              />
              <p>
                Ma voiture est une{" "}
                <span className="text-validBlue">{car.model.name}</span> qui
                possède <span className="text-validBlue">{car.seat}</span>{" "}
                places.
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default ProfileCardComponent;
