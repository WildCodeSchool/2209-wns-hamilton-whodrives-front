import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import moment from "moment";
import { toast } from "react-toastify";

export default function RegisterPassword({ user, backToPreviousStage }: any) {
  const REGISTER = gql`
    mutation CreateUser(
      $username: String!
      $password: String!
      $email: String!
      $phone: String!
      $dateOfBirth: Date!
      $firstname: String
      $lastname: String
    ) {
      createUser(
        username: $username
        password: $password
        email: $email
        phone: $phone
        date_of_birth: $dateOfBirth
        firstname: $firstname
        lastname: $lastname
      ) {
        password
        phone
        username
        lastname
        date_of_birth
        firstname
      }
    }
  `;

  const locationField = {
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    phone: user.phone,
    password: user.password,
    confirmPassword: user.confirmPassword,
    email: user.email,
    dateOfBirth: user.dateOfBirth,
    city: user.city,
    file: user.file,
  };

  const trips = [locationField];

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [createUser, { loading, error }] = useMutation(REGISTER);

  const isDisabled =
    password === "" || confirmPassword === "" || password !== confirmPassword;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password === "" || confirmPassword === "") {
      toast.error("Veuillez saisir un mot de passe et le confirmer!", {
        autoClose: 2000,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas!", {
        autoClose: 2000,
      });
      return;
    }

    try {
      await createUser({
        variables: {
          departurePlaces: locationField.departure,
          destination: locationField.arrival,
          dateDeparture: formattedDate.isValid()
            ? formattedDate.format("YYYY-MM-DD")
            : null,
          arrivalDate: formattedDate.isValid()
            ? formattedDate.format("YYYY-MM-DD")
            : null,
          price: locationField.price,
          description: locationField.description,
          hourDeparture: formattedTime.isValid()
            ? formattedTime.format("HH:mm:ss")
            : null,
          placeAvailable: locationField.passengers,
        },
      });
      toast.success("Vous êtes inscrit !", { autoClose: 1000 });
      setTimeout(() => {
        navigate("/auth");
      }, 2000);
    } catch (error) {
      toast.error("Une erreur s'est produite lors de l'inscription  ", {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="w-full h-[calc(100vh-10rem)] pt-6">
        <h1 className="mb-4 text-center text-layoutBlue">Inscription</h1>
        <div className="w-5/6 px-8 py-4 mx-auto my-4 border-2 border-validBlue sm:w-2/4">
          <p className="mb-4 font-bold">Étape 3: Mot de passe</p>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
          />
          <input
            type="password"
            placeholder="Confirmez le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
          />
        </div>
        <div className="flex justify-center">
          <button className="p-4" onClick={() => backToPreviousStage()}>
            <p className="font-bold text-whodrivesGrey hover:text-validBlue">
              Retour
            </p>
          </button>
          <button
            type="submit"
            onClick={handleRegister}
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
              S'inscrire
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
