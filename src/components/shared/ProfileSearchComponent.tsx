interface propsProfil {
  nameProfil: string;
}

function ProfileSearchComponent({ nameProfil }: propsProfil) {
  return (
    <div className="w-24 p-2 ml-10 mr-8 border-whodrivesGrey">
      <img src="/assets/images/blue.png" alt="" className="mb-2" />
      <p>{nameProfil}</p>
    </div>
  );
}

export default ProfileSearchComponent;
