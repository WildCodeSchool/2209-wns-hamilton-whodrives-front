import "../../styles/layout.css";
import { useNavigate } from "react-router-dom";

export default function HeaderComponent(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="h-20 bg-layoutBlue">
      <div className="flex flex-row items-center justify-end h-full gap-20 header-text">
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

        <div className="flex flex-row cursor-pointer">
          <img
            className="w-10"
            src="/assets/icons/user-white.svg"
            alt="user icon"
          />
          <img
            className="w-8"
            src="/assets/icons/chevron-down-white.svg"
            alt="chevron down icon"
          />
        </div>
      </div>
    </div>
  );
}
