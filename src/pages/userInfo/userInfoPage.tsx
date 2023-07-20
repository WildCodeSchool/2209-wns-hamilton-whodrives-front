import "react-toastify/dist/ReactToastify.css";

import { useMutation } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { CREATE_USER_INFO } from "../../queryMutation/mutations";

export default function UserInfoPage(): JSX.Element {
  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [address, setAddress] = React.useState("");

  const [createUserInfo, { loading }] = useMutation(CREATE_USER_INFO);
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createUserInfo({
      variables: { city, country, address },
    })
      .then(() => {
        toast.success("Vos informations ont été ajoutées avec succès !");
        navigate("/profile");
      })
      .catch((error) => {
        toast.error(
          `Erreur lors de l'ajout de vos informations : ${error.message}`
        );
      });
  };

  const isDisabled = !city || !country || !address;

  const BackToProfile = () => {
    window.history.back();
  };

  return (
    <div className="w-full flex-grow min-h-[calc(100vh-10rem)] pt-5">
      <h1 className="mb-4 text-center text-layoutBlue">Mes informations</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-5/6 p-8 m-auto my-4 border-2 md:w-1/2 border-validBlue"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
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
          <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
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
          <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
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
          <div className="flex justify-center">
            <button
              type="button"
              className="p-4"
              onClick={() => BackToProfile()}
            >
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
      </form>
    </div>
  );
}
