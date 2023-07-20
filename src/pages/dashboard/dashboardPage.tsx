import DashboardCard from "../../components/dashboard/DashboardCard";

export default function DashboardPage(): JSX.Element {
  return (
    <div className="w-full flex-grow min-h-[calc(100vh-10rem)] pt-5">
      <h1 className="mb-4 text-center text-layoutBlue">Mon tableau de bord</h1>
      <DashboardCard />
    </div>
  );
}
