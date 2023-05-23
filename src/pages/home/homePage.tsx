import HomeCardsComponent from "../../components/home/HomeCardsComponent";
import HomeImageInputComponent from "../../components/home/HomeImageInput";

export default function HomePage(): JSX.Element {
  return (
    <div className="min-h-screen">
      <HomeImageInputComponent />
      <HomeCardsComponent />
    </div>
  );
}
