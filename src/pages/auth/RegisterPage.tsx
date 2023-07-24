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
  const navigate = useNavigate();

  const [createUser, { loading, error }] = useMutation(REGISTER);

  const handleNext = (e: any) => {
    e.preventDefault();

    if (step === 1) {
      if (username && firstname && phone && lastname && email && dateOfBirth) {
        toast.success("Prémière étape terminée !", { autoClose: 1000 });
        setTimeout(() => {
          setStep(2);
        }, 3000);
      } else {
        toast.error("Veuillez remplir tous les champs de la première étape", {
          autoClose: 2000,
        });
      }
    } else if (step === 2) {
      if (
        password !== "" &&
        confirmPassword !== "" &&
        password === confirmPassword
      ) {
        toast.success("Troisième tape terminée !", { autoClose: 1000 });
        handleRegister(e);
      } else {
        toast.error("Veuillez saisir un mot de passe", { autoClose: 1000 });
      }
    }
  };

  const firstStepIsDisabled =
    !username || !firstname || !phone || !lastname || !email || !dateOfBirth;

  const secondStepIsDisabled =
    password === "" || confirmPassword === "" || password !== confirmPassword;

  const BackToPreviousStage = () => {
    setStep((prevActiveStep) => prevActiveStep - 1);
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

  const renderStep = () => {
    if (step === 1) {
      return (
        <div className="w-full flex-grow min-h-[calc(100vh-10rem)] pt-5">
          <h1 className="mb-4 text-center text-layoutBlue">Inscription</h1>
          <form
            onSubmit={handleNext}
            className="flex flex-col w-5/6 p-4 m-auto my-4 border-2 md:w-1/2 border-validBlue"
          >
            <div className="flex flex-col items-center justify-center">
              <p className="mb-4 font-semibold text-validBlue">
                Étape 1: Informations personnelles
              </p>
              <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
                <label className="mb-2 font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
                />
              </div>
              <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
                <label className="mb-2 font-semibold" htmlFor="username">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  placeholder="Nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
                />
              </div>
              <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
                <label className="mb-2 font-semibold" htmlFor="lastname">
                  Nom
                </label>
                <input
                  type="text"
                  placeholder="Nom"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
                />
              </div>
              <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
                <label className="mb-2 font-semibold" htmlFor="firstname">
                  Prénom
                </label>
                <input
                  type="text"
                  placeholder="Prénom"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
                />
              </div>
              <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
                <label className="mb-2 font-semibold" htmlFor="dateofbirth">
                  Date de naissance
                </label>
                <input
                  type="date"
                  placeholder="Date de naissance"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
                />
              </div>
              <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
                <label className="mb-2 font-semibold" htmlFor="phone">
                  Téléphone
                </label>
                <input
                  type="text"
                  placeholder="Téléphone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
                />
              </div>
            </div>
          </form>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleNext}
              disabled={firstStepIsDisabled}
              className="p-4"
            >
              <p
                className={
                  firstStepIsDisabled
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
    } else if (step === 2) {
      return (
        <div className="w-full flex-grow min-h-[calc(100vh-10rem)] pt-5">
          <h1 className="mb-4 text-center text-layoutBlue">Inscription</h1>
          <form
            onSubmit={handleRegister}
            className="flex flex-col w-5/6 p-4 m-auto my-4 border-2 md:w-1/2 border-validBlue"
          >
            <div className="flex flex-col items-center justify-center">
              <p className="mb-4 font-semibold text-validBlue">
                Étape 2: Mot de passe
              </p>
              <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
                <label className="mb-2 font-semibold" htmlFor="password">
                  Mot de passe
                </label>
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
                />
              </div>
              <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
                <label className="mb-2 font-semibold" htmlFor="confirmpassword">
                  Confirmez le mot de passe
                </label>
                <input
                  type="password"
                  placeholder="Confirmez le mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 mb-2 border border-gray-300 focus:ring focus:ring-validBlue"
                />
              </div>
            </div>
          </form>
          <div className="flex justify-center">
            <button className="p-4" onClick={() => BackToPreviousStage()}>
              <p className="font-bold text-whodrivesGrey hover:text-validBlue">
                Retour
              </p>
            </button>
            <button
              type="submit"
              onClick={handleRegister}
              disabled={secondStepIsDisabled}
              className="p-4"
            >
              <p
                className={
                  secondStepIsDisabled
                    ? "grey-button p-2 text-xs"
                    : "green-button p-2 text-xs"
                }
              >
                S'inscrire
              </p>
            </button>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="w-full min-h-[calc(100vh-10rem)]">
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
