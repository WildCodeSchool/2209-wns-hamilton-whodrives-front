import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

      if (success) {
        toast.success("Vous êtes connecté !", { autoClose: 2000 });
        await setUserInfos({ token, username, email: emailUser });
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

  return (
    <div className="w-full h-[calc(100vh-10rem)] pt-6">
      <h1 className="mb-4 text-center text-layoutBlue">Connexion</h1>
      <form
        onSubmit={handleLogin}
        className="grid w-5/6 p-8 m-auto my-4 border-2 md:w-1/2 border-validBlue"
      >
        <div className="flex flex-col items-center pb-4">
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-5/6 px-4 py-2 border border-gray-300 focus:ring focus:ring-validBlue"
          />
        </div>
        <div className="flex flex-col items-center">
          <input
            id="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-5/6 px-4 py-2 border border-gray-300 focus:ring focus:ring-validBlue"
          />
        </div>
        {error && <p>Une erreur s'est produite lors de la connexion.</p>}
      </form>
      <div className="flex justify-center">
        <button
          type="submit"
          className="p-4"
          onClick={handleLogin}
          disabled={loading}
        >
          <p className="p-2 text-xs green-button">Connexion</p>
        </button>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default LoginForm;
