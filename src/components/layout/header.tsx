import "../../global.css";
import { useNavigate } from "react-router-dom";

export default function HeaderComponent(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-20 bg-layoutBlue">
      <div className="flex flex-row items-center justify-end h-full gap-20 header-text">
        <div
          className="flex flex-row cursor-pointer"
          onClick={() => {
            navigate("search-trip");
          }}
        >
          <img className="" src="/assets/icons/search.svg" alt="search icon" />
          <p>Rechercher</p>
        </div>

        <div
          className="flex flex-row cursor-pointer"
          onClick={() => {
            navigate("create-trip");
          }}
        >
          <img src="/assets/icons/car.svg" alt="car icon" />
          <p>Publier un trajet</p>
        </div>

        <div className="flex flex-row cursor-pointer">
          <img src="/assets/icons/user.svg" alt="user icon" />
          <img src="/assets/icons/chevron-down.svg" alt="chevron down icon" />
        </div>
      </div>
    </div>
  );
}
