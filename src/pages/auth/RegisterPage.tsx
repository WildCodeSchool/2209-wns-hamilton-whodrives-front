import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

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

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [city, setCity] = useState('');
  const [file, setFile] = useState<File | null>(null); // Explicitly define the type

  const [createUser, { loading, error }] = useMutation(REGISTER);

  const handleNext = () => {
    if (step === 1) {
      // Validate the data of the first step
      if (username && password && email && dateOfBirth && city) {
        setStep(2);
      } else {
        console.log('Please fill in all fields in the first step.');
      }
    } else if (step === 2) {
      // Validate the data of the second step
      if (file && file.size > 0) {
        setStep(3);
      } else {
        console.log('Please select a file.');
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await createUser({
        variables: {
          username,
          password,
          email,
          phone: '',
          dateOfBirth,
          firstname: '',
          lastname: '',
        },
      });
      console.log('Utilisateur inscrit avec succès :', data.createUser);
    } catch (error) {
      console.log("Une erreur s'est produite lors de l'inscription :", error);
    }
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <div className="flex items-center justify-center flex-col">
          <div >
            <div className=" border-2 border-blue-500 p-16 mt-20">
              <h2 className="text-2xl font-bold mb-4">Étape 1: Informations personnelles</h2>
              <input
                type="text"
                placeholder="Nom"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Prénom"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <input
                type="date"
                placeholder="Date de naissance"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Ville"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
          <button type="button" onClick={handleNext} className=" bg-blue-500 text-white rounded py-2 mt-4">
                Suivant
          </button>
        </div>

      );
    } else if (step === 2) {
      return (
        <div className="flex items-center justify-center  border-2 border-blue-500">
          <div className="max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Étape 2: Envoi de fichier</h2>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files && e.target.files[0])}
              className="w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button type="button" onClick={handleNext} className="w-full bg-blue-500 text-white rounded py-2 mt-4 ">
              Suivant
            </button>
          </div>
        </div>
      );
    } else if (step === 3) {
      return (
        <div className="flex items-center justify-center  border-2 border-blue-500">
          <div className="max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Étape 3: Mot de passe</h2>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            />
            {password !== confirmPassword && <p className="text-red-500">Les mots de passe ne correspondent pas.</p>}
            <button type="submit" className="w-full bg-blue-500 text-white rounded py-2 mt-4">
              S'inscrire
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {renderStep()}
    </form>
  );
};

export default RegisterForm;
