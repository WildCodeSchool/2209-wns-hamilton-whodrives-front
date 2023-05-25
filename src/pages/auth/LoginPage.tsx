import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/login.css';


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
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated ?? false;

  const [loginUser, { loading, error }] = useMutation(LOGIN);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === '' || password === '') {
      toast.error('Veuillez saisir votre email et votre mot de passe.');
      return;
    }

    try {
      const { data } = await loginUser({ variables: { email, password } });
      const { success, token } = data.loginUser;

      if (success) {
        toast.success('Vous êtes connecté !', { autoClose: 2000 });
        localStorage.setItem('token', token);
        

        setTimeout(() => {
          navigate('/profile');
        }, 5000);
      } else {
        toast.error('Échec de la connexion. Veuillez vérifier vos informations.');
      }
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
    }
  };

  if (isAuthenticated) {
    navigate('/profile');
  }
  return (
    <div className="w-screen mt-20 flex flex-col justify-center items-center">
      <h1>Connexion</h1>
      <form onSubmit={handleLogin} className="grid gap-4 border-2 border-blue-500 p-48 mx-3 boxLogin w-10/12 m-5">
        <div className="flex flex-col items-center">
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
        <div className="flex flex-col items-center">
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
      <button
        type="submit"
        className="bg-green-300 p-3 text-lg shadow-md border-2 border-black text-white font-pressStart2p btnLogin mb-10"
        onClick={handleLogin}
        disabled={loading}
      >
        Connexion
      </button>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default LoginForm;
