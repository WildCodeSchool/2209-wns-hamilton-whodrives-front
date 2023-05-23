import HomeCardsComponent from "../../components/home/HomeCardsComponent";

export default function HomePage(): JSX.Element {
  return (
    <div className="h-screen">
      <div className="h-full bg-center bg-no-repeat bg-cover bg-whodrives-bg"></div>
      <HomeCardsComponent />
    </div>
  );
}
