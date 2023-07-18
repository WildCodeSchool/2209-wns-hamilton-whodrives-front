import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gql from "graphql-tag";
import { useNavigate } from "react-router-dom";
import RegisterUser from "../../components/auth/RegisterUser";
import RegisterProfilePic from "../../components/auth/RegisterProfilePic";

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
      password
      phone
      username
      lastname
      date_of_birth
      firstname
    }
  }
`;

interface IUser {
  username: string;
  firstname: string;
  lastname: string;
  phone: string;
  password: string;
  confirmPassword: string;
  email: string;
  dateOfBirth: string;
  city: string;
  file: File | null;
}

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

  const steps = [
    "Informations personnelles",
    "Photo de profil",
    "Mot de passe",
  ];

  const [activeStep, setActiveStep] = React.useState(0);

  const [user, setUser] = useState<IUser>({
    username: "",
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
    confirmPassword: "",
    email: "",
    dateOfBirth: "",
    city: "",
    file: null,
  });

  const handleRegisterUserDate = (data: IUser) => {
    setUser({ ...user, ...data });
    handleNextStep();
  };

  const handleRegisterProfilePicData = (data: IUser) => {
    setUser((user) => ({ ...user, ...data }));
    handleNextStep();
  };

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const backToPreviousStage = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <RegisterUser
            user={user}
            handleRegisterUserDate={handleRegisterUserDate}
          />
        );
      case 1:
        return (
          <RegisterProfilePic
            user={user}
            handleRegisterProfilePicData={handleRegisterProfilePicData}
            backToPreviousStage={backToPreviousStage}
          />
        );
      // case 2:
      //   return (
      //     <RegisterPassword
      //       user={user}
      //       backToPreviousStage={backToPreviousStage}
      //     />
      //   );
      default:
        return "Unknown step";
    }
  }

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

  const firstStepIsDisabled =
    !username ||
    !firstname ||
    !phone ||
    !lastname ||
    !email ||
    !dateOfBirth ||
    !city;

  const secondStepIsDisabled = !file || file.size === 0;

  const thirdStepIsDisabled =
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
          <div className="flex justify-center">
            <button className="p-4" onClick={() => backToPreviousStage()}>
              <p className="font-bold text-whodrivesGrey hover:text-validBlue">
                Retour
              </p>
            </button>
            <button
              type="button"
              onClick={handleNext}
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
                Suivant
              </p>
            </button>
          </div>
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
          <div className="flex justify-center">
            <button className="p-4" onClick={() => backToPreviousStage()}>
              <p className="font-bold text-whodrivesGrey hover:text-validBlue">
                Retour
              </p>
            </button>
            <button
              type="submit"
              onClick={handleRegister}
              disabled={thirdStepIsDisabled}
              className="p-4"
            >
              <p
                className={
                  thirdStepIsDisabled
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
