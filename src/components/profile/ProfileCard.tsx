import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { GET_USER_LOGGED } from "../../queryMutation/query";

const ProfileCardComponent = () => {
  const navigate = useNavigate();

  const handleClickUserInfos = () => {
    navigate("/user-infos");
  };

  const handleClickAbout = () => {
    navigate("/user-infos/about");
  };

  const handleClickCar = () => {
    navigate("/user-infos/car");
  };

  const handleClickAddPicture = (carId: string) => {
    localStorage.setItem("selectedCarId", carId);
    navigate("/user-infos/car-picture");
  };

  const { loading, error, data, refetch } = useQuery(GET_USER_LOGGED);

  useEffect(() => {
    refetch();
  }, []);

  const backendUrl = "http://localhost:4000/cars-images/";

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error retrieving user information.</div>;
  }

  const user = data.userLogged;

  return (
    <div className="flex flex-col w-5/6 p-8 m-auto my-4 border-2 md:flex-row md:w-1/2 border-validBlue">
      <div className="w-full mr-5 md:w-1/4">
        <img src="/assets/images/blue.png" alt="profile pic" />
        <p className="font-bold text-center">{user.username}</p>
      </div>
      <div className="w-full md:w-3/4">
        <h3 className="px-2 py-1 text-white bg-layoutBlue">A propos de moi</h3>

        {user.userInfo !== null && (
          <div>
            <div className="flex justify-end">
              <img
                className="w-4"
                src="assets/icons/edit-box.svg"
                alt="arrow icon"
                onClick={handleClickUserInfos}
              />
            </div>
            <div className="mb-2">
              <p>
                Salut, je m’appelle
                <span className="text-validBlue"> {user.lastname}</span> et
                j’habite à{" "}
                <span className="text-validBlue">{user.userInfo.city}</span> .
              </p>
            </div>
            {user.userInfo.about !== null ? (
              <div>
                <div className="flex justify-end">
                  <img
                    className="w-4"
                    src="assets/icons/edit-box.svg"
                    alt="arrow icon"
                    onClick={handleClickAbout}
                  />
                </div>
                <div className="mb-2">
                  <p className="font-bold">Description</p>
                  <p>{user.userInfo.about.description}</p>
                </div>
                <div className="mb-2">
                  <p className="font-bold">Préférences</p>
                  <div className="flex gap-6">
                    <div className="flex gap-1">
                      <img src="/assets/icons/chat-black.svg" alt="" />
                      <p>{user.userInfo.about.chatOption.content}</p>
                    </div>
                    <div className="flex gap-1">
                      <img src="/assets/icons/music-black.svg" alt="" />
                      <p>{user.userInfo.about.musicOption.content}</p>
                    </div>
                    <div>
                      {user.userInfo.about.animal === true ? (
                        <img
                          src="/assets/icons/animal-blue.svg"
                          alt=""
                          title="J'accepte les animaux"
                        />
                      ) : (
                        <img
                          src="/assets/icons/animal-grey.svg"
                          alt=""
                          title="Je n'accepte pas les animaux"
                        />
                      )}
                    </div>
                    <div>
                      {user.userInfo.about.smoke === true ? (
                        <img
                          src="/assets/icons/wind-blue.svg"
                          alt=""
                          title="Je tolère la cigarette"
                        />
                      ) : (
                        <img
                          src="/assets/icons/wind-grey.svg"
                          alt=""
                          title="Je ne tolère pas la cigarette"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button className="p-4" onClick={handleClickAbout}>
                <p className="font-bold text-whodrivesGrey hover:text-validBlue">
                  Ajoutez vos préférences
                </p>
              </button>
            )}
          </div>
        )}
        {user.userInfo === null && (
          <>
            <button className="p-4" onClick={handleClickUserInfos}>
              <p className="font-bold text-whodrivesGrey hover:text-validBlue">
                Ajoutez vos informations
              </p>
            </button>
          </>
        )}
        <h3 className="px-2 py-1 text-white bg-layoutBlue">Ma Voiture</h3>
        {user.cars.length === 0 ? (
          <button className="p-4" onClick={handleClickCar}>
            <p className="font-bold text-whodrivesGrey hover:text-validBlue">
              Ajoutez votre voiture
            </p>
          </button>
        ) : (
          user.cars.map((car: any) => (
            <div className="flex-col md:flex" key={car.id}>
              <img
                className="w-4"
                src="assets/icons/edit-box.svg"
                alt="arrow icon"
                onClick={handleClickCar}
              />
              {car.carPictures ? (
                car.carPictures.map((picture: any) => (
                  <div key={picture.id}>
                    {picture.path !== null ? (
                      <img
                        src={backendUrl + picture.path}
                        alt=""
                        className="w-full md:w-48"
                        onClick={() => handleClickAddPicture(car.id)}
                      />
                    ) : (
                      <img
                        src="/assets/images/yellow-car.png"
                        alt=""
                        className="w-full md:w-48"
                        onClick={() => handleClickAddPicture(car.id)}
                      />
                    )}
                  </div>
                ))
              ) : (
                <img
                  src="/assets/images/yellow-car.png"
                  alt=""
                  className="w-full md:w-48"
                  onClick={() => handleClickAddPicture(car.id)}
                />
              )}
              <p className="w-full">
                Ma voiture est une{" "}
                <span className="text-validBlue">{car.model?.name}</span> qui
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
