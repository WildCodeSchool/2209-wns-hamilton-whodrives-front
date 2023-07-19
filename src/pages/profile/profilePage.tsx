import ProfileCardComponent from "../../components/profile/ProfileCard";

export default function ProfilePage(): JSX.Element {
  return (
    <div className="w-full flex-grow min-h-[calc(100vh-10rem)] pt-6">
      <h1 className="mb-4 text-center text-layoutBlue">Mon compte</h1>
      <ProfileCardComponent />
    </div>
  );
}
