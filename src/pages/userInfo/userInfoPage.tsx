import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  CREATE_USER_INFO,
  UPDATE_USER_INFO,
} from "../../queryMutation/mutations";
import { GET_USERINFO_LOGGED } from "../../queryMutation/query";

export default function UserInfoPage(): JSX.Element {
  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [address, setAddress] = React.useState("");

  const [createUserInfo, { loading: creating }] = useMutation(CREATE_USER_INFO);
  const [updateUserInfo, { loading: updating }] = useMutation(UPDATE_USER_INFO);

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!city || !country || !address) {
      if (!userInfoData.getUserLogged.userInfo) {
        toast.error(
          "Veuillez remplir tous les champs pour ajouter vos informations.",
          { autoClose: 2000 }
        );
        return;
      }

      toast.success(
        "Vos informations n'ont pas été modifiées car les champs sont vides.",
        { autoClose: 1000 }
      );
      navigate("/profile");
      return;
    }

    const mutation = userInfoData.getUserLogged.userInfo
      ? updateUserInfo
      : createUserInfo;

    mutation({
      variables: {
        city,
        country,
        address,
        updateUserInfoId: userInfoData.getUserLogged.userInfo?.id,
      },
    })
      .then(() => {
        toast.success(
          `Vos informations ont été ${
            userInfoData.getUsserLogged.userInfo ? "mises à jour" : "ajoutées"
          } avec succès !`
        );
        navigate("/profile");
      })
      .catch((error) => {
        toast.error(
          `Erreur lors de ${
            userInfoData.getUsserLogged.userInfo ? "la mise à jour" : "l'ajout"
          } de vos informations : ${error.message}`
        );
      });
  };

  const isDisabled = !city || !country || !address;
  const BackToProfile = () => {
    window.history.back();
  };

  const { loading: userInfoLoading, data: userInfoData } =
    useQuery(GET_USERINFO_LOGGED);

  useEffect(() => {
    if (!userInfoLoading && userInfoData && userInfoData.getUserLogged) {
      const { city, country, address } = userInfoData.getUserLogged.userInfo || {};
      setCity(city || "");
      setCountry(country || "");
      setAddress(address || "");
    }
  }, [userInfoLoading, userInfoData]);

  return (
    <div className="w-full flex-grow min-h-[calc(100vh-10rem)] pt-5">
      <h1 className="mb-4 text-center text-layoutBlue">Mes informations</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-5/6 p-8 m-auto my-4 border-2 md:w-1/2 border-validBlue"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
            <label className="mb-2 font-semibold" htmlFor="city">
              Ville
            </label>
            <input
              id="city"
              type="text"
              placeholder="Ville"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 mb-2 border border-gray-300 focus:outline-validBlue"
            />
          </div>
          <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
            <label className="mb-2 font-semibold" htmlFor="country">
              Pays
            </label>
            <input
              id="country"
              type="text"
              placeholder="Pays"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2 mb-2 border border-gray-300 focus:outline-validBlue"
            />
          </div>
          <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
            <label className="mb-2 font-semibold" htmlFor="address">
              Adresse
            </label>
            <input
              id="address"
              type="text"
              placeholder="Adresse"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 mb-2 border border-gray-300 focus:outline-validBlue"
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
