import { useQuery, gql } from "@apollo/client";

const GET_USER_LOGGED = gql`
  query getUserLogged {
    userLogged {
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
  const token = localStorage.getItem("token");

  const { loading, error, data } = useQuery(GET_USER_LOGGED, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error retrieving user information.</div>;
  }
  const user = data.userLogged;

  return (
    <div className="flex p-8 m-20 border-2 border-blue-500 ">
      <div className="w-1/3 mr-5">
        <img src="/assets/images/dot-megachx.jpg" alt="" className="w-64" />
        <p>{user.username}</p>
      </div>
      <div className="w-2/3">
        <h3 className="text-white bg-blue-700">A propos de moi</h3>
        {user.userInfo && (
          <>
            <p>
              Salut, je m’appelle
              <span className="text-validBlue"> {user.lastname}</span>, j’ai{" "}
              <span className="text-validBlue">{user.userInfo.age} </span> ans
              et j’habite à{" "}
              <span className="text-validBlue">{user.userInfo.city}</span> .
            </p>
            <div className="mt-2 Description">
              <h4>Description</h4>
              <p className="ml-3">{user.userInfo.about.description}</p>
            </div>
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
        )}

        <h3 className="text-white bg-blue-700">Ma Voiture</h3>
        {user.cars.map((car: any) => (
          <div className="flex Cars" key={car.id}>
            <img src="/assets/images/yellow-car.png" alt="" className="w-64" />
            <p>
              Ma voiture est une{" "}
              <span className="text-validBlue">{car.model.name}</span> qui
              possède <span className="text-validBlue">{car.seat}</span> places.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutMeComponent;
