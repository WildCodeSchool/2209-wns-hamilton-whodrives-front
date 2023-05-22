import AboutMeComponent from "./aboutMe";
import "../../styles/profile.css"

export default function ProfileComponent(): JSX.Element {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">Mon Compte</h1>
      <div className="card">
        <AboutMeComponent/>
      </div>
    </div>
  );
}