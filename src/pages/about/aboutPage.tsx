import { GET_MUSIC_OPTIONS, GET_CHAT_OPTIONS } from "../../queryMutation/query";
import { CREATE_ABOUT } from "../../queryMutation/mutations";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

export default function AboutPage(): JSX.Element {
  const [animal, setAnimal] = useState(false);
  const [description, setDescription] = useState("");
  const [smoke, setSmoke] = useState(false);
  const [chatOptionId, setChatOptionId] = useState("");
  const [musicOptionId, setMusicOptionId] = useState("");

  const {
    loading: musicLoading,
    error: musicError,
    data: musicData,
  } = useQuery(GET_MUSIC_OPTIONS);

  const {
    loading: chatLoading,
    error: chatError,
    data: chatData,
  } = useQuery(GET_CHAT_OPTIONS);

  const [createAbout, { loading, error }] = useMutation(CREATE_ABOUT);

  const BackToProfile = () => {
    window.history.back();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    createAbout({
      variables: {
        animal,
        description,
        smoke,
        chatOptionId,
        musicOptionId,
      },
    })
      .then((data) => {
        // Gérer la réponse de la mutation réussie ici
        console.log("Mutation réussie", data);
      })
      .catch((error) => {
        // Gérer l'erreur de la mutation ici
        console.log("Erreur de la mutation", error);
      });
  };

  if (musicLoading || chatLoading) {
    return <div>Loading...</div>;
  }

  if (musicError || chatError) {
    return <div>Error loading options.</div>;
  }

  const musicOptions = musicData.musicOptions;
  const chatOptions = chatData.chatOptions;

  return (
    <div className="w-full flex-grow min-h-[calc(100vh-10rem)] pt-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-5/6 p-8 m-auto my-4 border-2 md:w-1/2 border-validBlue"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col w-1/2 mb-4">
            <label className="mb-2 font-bold">
              Acceptez-vous les animaux ?
            </label>
            <input
              type="checkbox"
              checked={animal}
              onChange={(e) => setAnimal(e.target.checked)}
            />
          </div>
          <div className="flex flex-col w-1/2 mb-4">
            <label className="mb-2 font-bold">
              Acceptez-vous les fumeurs ?
            </label>
            <input
              type="checkbox"
              checked={smoke}
              onChange={(e) => setSmoke(e.target.checked)}
            />
          </div>
          <div className="flex flex-col w-1/2 mb-4">
            <label className="mb-2 font-bold">
              Etes-vous bavard en voiture ?
            </label>
            <select
              value={chatOptionId}
              onChange={(e) => setChatOptionId(e.target.value)}
              className="px-2 py-1 border"
            >
              <option value=""></option>
              {chatOptions.map((option: { id: string; content: string }) => (
                <option key={option.id} value={option.id}>
                  {option.content}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-1/2 mb-4">
            <label className="mb-2 font-bold">
              Quel genre de musique écoutez-vous ?
            </label>
            <select
              value={musicOptionId}
              onChange={(e) => setMusicOptionId(e.target.value)}
              className="px-2 py-1 border"
            >
              <option value=""></option>
              {musicOptions.map((option: { id: string; content: string }) => (
                <option key={option.id} value={option.id}>
                  {option.content}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-1/2 mb-4">
            <label className="mb-2 font-bold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-2 py-1 border"
            />
          </div>
        </div>
      </form>
      <div className="flex justify-center">
        <button type="button" className="p-4" onClick={() => BackToProfile()}>
          <p className="font-bold text-whodrivesGrey hover:text-validBlue">
            Retour
          </p>
        </button>
        <button type="submit" className="p-4">
          <p className="p-2 text-xs green-button">Valider</p>
        </button>
      </div>
    </div>
  );
}
