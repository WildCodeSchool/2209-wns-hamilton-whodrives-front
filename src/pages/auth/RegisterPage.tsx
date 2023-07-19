import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gql from "graphql-tag";
import { useNavigate } from "react-router-dom";

const REGISTER = gql`
  mutation CreateUser(
    $username: String!
    $password: String!
    $email: String!
    $phone: String! # Modifier le type en String!
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
      phone
      username
      lastname
      date_of_birth
      firstname
    }
  }
`;
const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const [createUser, { loading, error }] = useMutation(REGISTER);

  const handleNext = (e: any) => {
    e.preventDefault();

    if (step === 1) {
      if (
        username &&
        firstname &&
        phone &&
        lastname &&
        email &&
        dateOfBirth &&
        city
      ) {
        toast.success("1er etape terminée !", { autoClose: 3000 });
        setTimeout(() => {
          setStep(2);
        }, 3000);
      } else {
        toast.error("Veuillez remplir tous les champs de la première étape", {
          autoClose: 2000,
        });
      }
    } else if (step === 2) {
      if (file && file.size > 0) {
        toast.success("2eme etape terminée !", { autoClose: 2000 });
        setTimeout(() => {
          setStep(3);
        }, 3000);
      } else {
        toast.error("Veuillez sélectionner un fichier", { autoClose: 2000 });
      }
    } else if (step === 3) {
      if (
        password !== "" &&
        confirmPassword !== "" &&
        password === confirmPassword
      ) {
        toast.success("3eme etape terminée !", { autoClose: 2000 });
        handleRegister(e);
      } else {
        toast.error("Veuillez saisir un mot de passe. !", { autoClose: 2000 });
      }
    }
  };

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
          username,
          password,
          email,
          phone,
          dateOfBirth,
          firstname,
          lastname,
        },
      });
      toast.success("Vous êtes inscrit !", { autoClose: 3000 });
      setTimeout(() => {
        navigate("/auth");
      }, 2000);
    } catch (error) {
      toast.error("Une erreur s'est produite lors de l'inscription  ", {
        autoClose: 2000,
      });
    }
  };
  const renderStep = () => {
    if (step === 1) {
      return (
        <div className="flex flex-col items-center justify-center">
          <div>
            <div className="p-16 mt-20 border-2 border-blue-500 ">
              <h2 className="mb-4 text-2xl font-bold">
                Étape 1: Informations personnelles
              </h2>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 mb-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Nom"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full px-4 py-2 mb-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Prénom"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full px-4 py-2 mb-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 mb-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mb-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <input
                type="date"
                placeholder="Date de naissance"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full px-4 py-2 mb-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Ville"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 mb-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleNext}
            className="py-2 mt-4 mb-5 text-white bg-blue-500 btnRegister"
          >
            Suivant
          </button>
        </div>
      );
    } else if (step === 2) {
      return (
        <div className="flex flex-col items-center justify-center ">
          <div className="p-40 m-5 border-2 border-blue-500">
            <h2 className="mb-4 text-2xl font-bold">
              Étape 2: Photo de profil
            </h2>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files && e.target.files[0])}
              className="w-full px-4 py-2 mb-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="button"
            onClick={handleNext}
            className="py-2 m-5 mt-4 text-white bg-blue-500 btnRegister"
          >
            Suivant
          </button>
        </div>
      );
    } else if (step === 3) {
      return (
        <div className="flex flex-col items-center justify-center ">
          <div className="p-40 m-5 border-2 border-blue-500">
            <h2 className="mb-4 text-2xl font-bold">Étape 3: Mot de passe</h2>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mb-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="password"
              placeholder="Confirmez le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 mb-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            onClick={handleRegister}
            className="py-2 m-5 mt-4 text-white bg-blue-500 btnRegister"
          >
            S'inscrire
          </button>
        </div>
      );
    }
  };
  return (
    <div className="container mx-auto">
      <form onSubmit={handleRegister}>{renderStep()}</form>
      {loading && <div>Loading...</div>}
      {error && (
        <>
          <ToastContainer position="top-right" />
          {toast.error(
            "Une erreur s'est produite lors de l'inscription. Veuillez réessayer."
          )}
        </>
      )}
    </div>
  );
};
export default RegisterPage;
