import { CREATE_USER_INFO } from "../../queryMutation/mutations";
import React from "react";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function UserInfoPage(): JSX.Element {
  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [age, setAge] = React.useState(0);
  const [address, setAddress] = React.useState("");

  const [createUserInfo, { loading }] = useMutation(CREATE_USER_INFO);
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createUserInfo({
      variables: { city, country, age, address },
    })
      .then(() => {
        toast.success("Informations ajoutées avec succès !");
        navigate("/profile");
      })
      .catch((error) => {
        toast.error(
          `Erreur lors de l'ajout des informations : ${error.message}`
        );
      });
  };

  const isDisabled = !city || !country || !age || !address;

  const BackToProfile = () => {
    window.history.back();
  };

  return (
    <div className="w-full flex-grow min-h-[calc(100vh-10rem)] pt-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-5/6 p-8 m-auto my-4 border-2 md:w-1/2 border-validBlue"
      >
        <div className="mb-4">
          <label className="mb-2 font-bold" htmlFor="city">
            Ville
          </label>
          <input
            id="city"
            type="text"
            placeholder="Ville"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 font-bold" htmlFor="country">
            Pays
          </label>
          <input
            id="country"
            type="text"
            placeholder="Pays"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 font-bold" htmlFor="age">
            Age
          </label>
          <input
            id="age"
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 font-bold" htmlFor="address">
            Adresse
          </label>
          <input
            id="address"
            type="text"
            placeholder="Adresse"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
          />
        </div>
      </form>
      <div className="flex justify-center">
        <button type="button" className="p-4" onClick={() => BackToProfile()}>
          <p className="font-bold text-whodrivesGrey hover:text-validBlue">
            Retour
          </p>
        </button>
        <button type="submit" disabled={isDisabled} className="p-4">
          <p
            className={
              isDisabled
                ? "grey-button p-2 text-xs"
                : "green-button p-2 text-xs"
            }
          >
            Valider
          </p>
        </button>
      </div>
    </div>
  );
}
