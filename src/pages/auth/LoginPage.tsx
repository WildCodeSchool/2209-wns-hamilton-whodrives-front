import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/login.css";
import useAuth from "../../hooks/useAuth";

const LOGIN = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      email
      username
      success
      token
    }
  }
`;

const LoginForm = () => {
  const { setUserInfos, userInfos } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const isAuthenticated = authContext?.isAuthenticated ?? false;

  const [loginUser, { loading, error }] = useMutation(LOGIN);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Veuillez saisir votre email et votre mot de passe.");
      return;
    }

    try {
      const { data } = await loginUser({ variables: { email, password } });
      const { success, token, email: emailUser, username } = data.loginUser;
      console.log("data", data);
      if (success) {
        toast.success("Vous êtes connecté !", { autoClose: 2000 });
        await setUserInfos({ token, username, email: emailUser });
        console.log(userInfos);
        setTimeout(() => {
          navigate("/profile", { replace: true });
        }, 5000);
      } else {
        toast.error(
          "Échec de la connexion. Veuillez vérifier vos informations."
        );
      }
    } catch (error) {
      toast.error(
        "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
      );
    }
  };

  // if (isAuthenticated) {
  //   navigate("/profile");
  // }
  return (
    <div className="flex flex-col items-center justify-center w-screen mt-20">
      <h1>Connexion</h1>
      <form
        onSubmit={handleLogin}
        className="grid w-10/12 gap-4 p-48 m-5 mx-3 border-2 border-blue-500 boxLogin"
      >
        <div className="flex flex-col items-center">
          <label htmlFor="email" className="block">
            Email :
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-11/12 border border-gray-300"
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
            className="w-11/12 border border-gray-300"
          />
        </div>
        {error && <p>Une erreur s'est produite lors de la connexion.</p>}
      </form>
      <button
        type="submit"
        className="p-3 mb-10 text-lg text-white bg-green-300 border-2 border-black shadow-md font-pressStart2p btnLogin"
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
