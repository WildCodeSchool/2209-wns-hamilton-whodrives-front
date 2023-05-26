import HomeBudgetFormComponent from "../../components/home/HomeBudgetForm";
import HomeCardsComponent from "../../components/home/HomeCards";
import HomeImageFormComponent from "../../components/home/HomeImageForm";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function HomePage(): JSX.Element {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated;
  return (
    <div className="min-h-screen">
      <div>
        {isAuthenticated ? (
          <h1>Hello World! Connected</h1>
        ) : (
          <h1>not connected ! </h1>
        )}
      </div>
      <HomeImageFormComponent />
      <HomeCardsComponent />
      <HomeBudgetFormComponent />
    </div>
  );
}
