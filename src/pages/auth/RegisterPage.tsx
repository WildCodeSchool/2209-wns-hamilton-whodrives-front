import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const [createUser, { loading, error }] = useMutation(REGISTER);

  const handleRegister = async (e:any) => {
    e.preventDefault();
    try {
      const { data } = await createUser({
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
      // L'utilisateur est inscrit avec succès, vous pouvez effectuer des actions supplémentaires ici
      console.log('Utilisateur inscrit avec succès :', data.createUser);
    } catch (error) {
      // Une erreur s'est produite lors de l'inscription, vous pouvez la gérer ici
      console.log("Une erreur s'est produite lors de l'inscription :", error);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Nom d'utilisateur :</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Téléphone :</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label>Date de naissance :</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div>
          <label>Prénom :</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div>
          <label>Nom de famille :</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
       
        <button type="submit" disabled={loading}> S'inscrire </button>
        {error && <p>Une erreur s'est produite lors de l'inscription.</p>}
      </form> 
    </div>  

  );
};
export default RegisterForm;
