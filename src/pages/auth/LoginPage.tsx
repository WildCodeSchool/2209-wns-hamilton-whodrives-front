import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      email
      success
      token
    }
  }
`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser, { loading, error }] = useMutation(LOGIN);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ variables: { email, password } });
      const { success, token } = data.loginUser;
      if (success) {
        console.log('Utilisateur connecté avec succès. Token :', token);
        const response = await loginUser({
          variables: { email, password },
          context: {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        });
      } else {
        console.log('Échec de la connexion');
      }
    } catch (error) {
      console.log("Une erreur s'est produite lors de la connexion :", error);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" disabled={loading}>
          Se connecter
        </button>
        {error && <p>Une erreur s'est produite lors de la connexion.</p>}
      </form>
    </div>
  );
};

export default LoginForm;
