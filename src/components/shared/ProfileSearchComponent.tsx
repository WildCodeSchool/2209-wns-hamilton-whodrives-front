interface IPropsProfile {
  nameProfil: string;
}

export default function ProfileSearchComponent({ nameProfil }: IPropsProfile) {
  return (
    <div className="w-24 p-2 text-center">
      <img src="/assets/images/blue.png" alt="" className="mb-2" />
      <p>{nameProfil}</p>
    </div>
  );
}
