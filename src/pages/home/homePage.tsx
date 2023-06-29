import HomeBudgetFormComponent from "../../components/home/HomeBudgetForm";
import HomeCardsComponent from "../../components/home/HomeCards";
import HomeImageFormComponent from "../../components/home/HomeImageForm";
import useAuth from "../../hooks/useAuth";

export default function HomePage(): JSX.Element {
  const { userInfos } = useAuth();

  return (
    <div className="min-h-screen">
      <div>
        {Object.keys(userInfos).length > 0 ? (
          <h1>User connecté en tant que {userInfos.email}</h1>
        ) : (
          <h1>User not connected</h1>
        )}
      </div>
      <HomeImageFormComponent />
      <HomeCardsComponent />
      <HomeBudgetFormComponent />
    </div>
  );
}
