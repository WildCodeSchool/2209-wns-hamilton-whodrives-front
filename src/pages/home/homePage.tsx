import HomeBudgetFormComponent from "../../components/home/HomeBudgetForm";
import HomeCardsComponent from "../../components/home/HomeCards";
import HomeImageFormComponent from "../../components/home/HomeImageForm";

export default function HomePage(): JSX.Element {
  return (
    <div className="w-full min-h-screen">
      <HomeImageFormComponent />
      <HomeCardsComponent />
      <HomeBudgetFormComponent />
    </div>
  );
}
