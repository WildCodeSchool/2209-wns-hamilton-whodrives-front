import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import "../../styles/login.css";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const LOGIN = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      email
      success
      token
    }
  }
`;

// const sendForm = (e: any) => {
//   const form = document.querySelector('form');
//   e.preventDefault();
//   form?.submit();
//   console.log('Formulaire envoyé');
// }
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
        toast.success('Vous êtes connecté !', { autoClose: 5000 });
        setTimeout(() => {
          navigate('/'); // Redirection vers la page d'accueil après 5 secondes
        }, 5000);
      } else {
        console.log('Échec de la connexion');
      }
    } catch (error) {
      console.log("Une erreur s'est produite lors de la connexion :", error);
    }
  };
  

  return (
    <div className="w-screen mt-20 flex flex-col justify-center items-center">
      <h1>Connexion</h1>
      <form onSubmit={handleLogin} className="grid gap-4 border-2 border-blue-500 p-48 mx-3 boxLogin w-10/12 m-5">
        <div className="flex flex-col items-center"> {/* Ajout de la classe flex-col et items-center */}
          <label htmlFor="email" className="block">
            Email :
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 w-11/12"
          />
        </div>
        <div className="flex flex-col items-center"> {/* Ajout de la classe flex-col et items-center */}
          <label htmlFor="password" className="block">
            Mot de passe :
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300  w-11/12"
          />
        </div>
        {error && <p>Une erreur s'est produite lors de la connexion.</p>}
      </form>
      <button type="submit" className="bg-green-300 p-3 text-lg shadow-md border-2 border-black text-white font-pressStart2p btnLogin" onClick={handleLogin} disabled={loading}>
        Connexion
      </button>
    </div>
  );
};

export default LoginForm;

