import { set } from "date-fns";
import { useEffect, useState } from "react";

export default function RegisterUser({ handleRegisterUserDate, user }: any) {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    ifTripDataIsComplete();
  }, []);

  function ifTripDataIsComplete() {
    if (
      user.username &&
      user.firstname &&
      user.lastname &&
      user.phone &&
      user.email &&
      user.dateOfBirth &&
      user.city
    ) {
      setUsername(user.username);
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setPhone(user.phone);
      setEmail(user.email);
      setDateOfBirth(user.dateOfBirth);
      setCity(user.city);
    }
  }

  const isDisabled =
    !username ||
    !firstname ||
    !lastname ||
    !phone ||
    !email ||
    !dateOfBirth ||
    !city;

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="w-5/6 px-8 py-4 mx-auto my-4 border-2 border-validBlue sm:w-2/4">
        <p className="mb-4 font-bold">Étape 1: Informations personnelles</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
        />
        <input
          type="text"
          placeholder="Nom"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
        />
        <input
          type="text"
          placeholder="Prénom"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
        />
        <input
          type="text"
          placeholder="Téléphone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
        />
        <input
          type="text"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
        />
        <input
          type="date"
          placeholder="Date de naissance"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
        />
        <input
          type="text"
          placeholder="Ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
        />
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleRegisterUserDate}
          disabled={isDisabled}
          className="p-4"
        >
          <p
            className={
              isDisabled
                ? "grey-button p-2 text-xs"
                : "green-button p-2 text-xs"
            }
          >
            Suivant
          </p>
        </button>
      </div>
    </div>
  );
}
