import "../../../styles/layout.css";
import { useNavigate } from "react-router-dom";
import HeaderProfileMenu from "./headerProfileMenu";

export default function HeaderComponent(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-20 p-10 bg-layoutBlue">
      <div className="flex flex-row items-center justify-end h-full gap-20 header-text">
        <div className="flex flex-row w-auto gap-20 lg:mr-40">
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
            <p>Rechercher</p>
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
            <p>Publier un trajet</p>
          </div>
        </div>

        <HeaderProfileMenu />
      </div>
    </div>
  );
}
