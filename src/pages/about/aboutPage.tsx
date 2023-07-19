import { GET_MUSIC_OPTIONS, GET_CHAT_OPTIONS } from "../../queryMutation/query";
import { CREATE_ABOUT } from "../../queryMutation/mutations";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
      .then(() => {
        toast.success("Vos préférences on été ajoutées avec succès !");
        navigate("/profile");
      })
      .catch((error) => {
        toast.error(
          `Erreur lors de l'ajout de vos préférences : ${error.message}`
        );
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
      <h2 className="mb-4 text-center text-layoutBlue">Mes préférences</h2>
      <div className="grid w-5/6 p-8 m-auto my-4 border-2 md:w-1/2 border-validBlue">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
            <label className="mb-2 font-bold">
              Acceptez-vous les animaux ?
            </label>
            <div className="flex gap-4">
              <img
                src={
                  animal
                    ? "/assets/icons/animal-blue.svg"
                    : "/assets/icons/animal-grey.svg"
                }
                alt=""
                onClick={() => setAnimal(!animal)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
            <label className="mb-2 font-bold">
              Acceptez-vous les fumeurs ?
            </label>
            <div className="flex gap-4">
              <img
                src={
                  smoke
                    ? "/assets/icons/wind-blue.svg"
                    : "/assets/icons/wind-grey.svg"
                }
                alt=""
                onClick={() => setSmoke(!smoke)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
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
          <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
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
          <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
            <label className="mb-2 font-bold">Description</label>
            <textarea
              value={description}
              placeholder="150 caractères maximum"
              onChange={(e) => setDescription(e.target.value)}
              className="px-2 py-1 border"
              maxLength={150}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button type="button" className="p-4" onClick={() => BackToProfile()}>
          <p className="font-bold text-whodrivesGrey hover:text-validBlue">
            Retour
          </p>
        </button>
        <button type="submit" className="p-4" onClick={handleSubmit}>
          <p className="p-2 text-xs green-button">Valider</p>
        </button>
      </div>
    </div>
  );
}
