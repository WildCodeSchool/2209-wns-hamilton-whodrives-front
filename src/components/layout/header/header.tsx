import "../../../styles/layout.css";
import { useNavigate } from "react-router-dom";
import HeaderProfileMenu from "./headerProfileMenu";

export default function HeaderComponent(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-20 w-screen h-20 p-10 md:w-full bg-layoutBlue">
      <div className="flex-row items-center justify-end h-full gap-20 sm:flex">
        <div className="flex-row hidden w-auto gap-20 text-xs sm:flex md:text-sm lg:text-base lg:mr-40 header-text sm:visible">
          <div
            className="flex flex-row gap-2 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <h2>Accueil</h2>
          </div>

          <div
            className="flex flex-row gap-2 cursor-pointer"
            onClick={() => {
              navigate("search-trip");
            }}
          >
            <img
              className="w-6"
              src="/assets/icons/search-white.svg"
              alt="search icon"
            />
            <h2>Rechercher</h2>
          </div>

          <div
            className="flex flex-row gap-2 cursor-pointer"
            onClick={() => {
              navigate("create-trip");
            }}
          >
            <img
              className="w-6"
              src="/assets/icons/car-white.svg"
              alt="car icon"
            />
            <h2>Publier un trajet</h2>
          </div>
        </div>

        <div>
          <HeaderProfileMenu />
        </div>
      </div>
    </div>
  );
}
