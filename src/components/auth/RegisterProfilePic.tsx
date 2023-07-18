import { useEffect, useState } from "react";

export default function RegisterProfilePic({
  user,
  handleRegisterProfilePicData,
  backToPreviousStage,
}: any) {
  useEffect(() => {
    ifUserDataIsComplete();
  }, []);

  function ifUserDataIsComplete() {
    if (user.file) {
      setFile(user.file);
    }
  }

  const [file, setFile] = useState<File | null>(null);

  const isDisabled = !file || file.size === 0;

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="w-full h-[calc(100vh-10rem)] pt-6">
        <h1 className="mb-4 text-center text-layoutBlue">Inscription</h1>
        <div className="w-5/6 px-8 py-4 mx-auto my-4 border-2 border-validBlue sm:w-2/4">
          <p className="mb-4 font-bold">Étape 2: Photo de profil</p>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files && e.target.files[0])}
            className="w-full px-4 py-2 mb-2 border border-gray-300"
          />
        </div>
        <div className="flex justify-center">
          <button className="p-4" onClick={() => backToPreviousStage()}>
            <p className="font-bold text-whodrivesGrey hover:text-validBlue">
              Retour
            </p>
          </button>
          <button
            type="button"
            onClick={handleRegisterProfilePicData}
            disabled={isDisabled}
            className="p-4"
          >
            <p
              className={
                isDisabled
                  ? "grey-button p-2 text-xs"
                  : "green-button p-2 text-xs"
              }
            >
              Suivant
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
