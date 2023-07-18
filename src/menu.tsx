import React from "react";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import CreateTripPage from "./pages/createTrip/createTripPage";
import HomePage from "./pages/home/homePage";
import ProfilePage from "./pages/profile/profilePage";
import SearchTripPage from "./pages/searchTrip/SearchTripPage";

type Menu = {
  path: string;
  titleFr: string;
  titleEn: string;
  Component: React.ComponentType;
};

const menuList: Menu[] = [
  {
    path: "/",
    titleFr: "Accueil",
    titleEn: "Home",
    Component: HomePage,
  },
  {
    path: "/login",
    titleFr: "Connexion",
    titleEn: "Login",
    Component: LoginPage,
  },
  {
    path: "/register",
    titleFr: "Inscription",
    titleEn: "Register",
    Component: RegisterPage,
  },
  {
    path: "/profile",
    titleFr: "Mon compte",
    titleEn: "My profile",
    Component: ProfilePage,
  },
  {
    path: "/create-trip",
    titleFr: "Publier un trajet",
    titleEn: "Create a trip",
    Component: CreateTripPage,
  },
  {
    path: "/search-trip",
    titleFr: "Rechercher un trajet",
    titleEn: "Search a trip",
    Component: SearchTripPage,
  },
];

export default menuList;
