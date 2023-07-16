import AboutMeComponent from "./aboutMe";

export default function ProfileMainCardComponent(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-4xl font-bold">Mon Compte</h1>
      <div className="card">
        <AboutMeComponent />
      </div>
    </div>
  );
}
