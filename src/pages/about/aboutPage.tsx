import {
  GET_MUSIC_OPTIONS,
  GET_CHAT_OPTIONS,
  GET_ABOUT,
} from "../../queryMutation/query";
import { CREATE_ABOUT, UPDATE_ABOUT } from "../../queryMutation/mutations";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AboutPage(): JSX.Element {
  const [animal, setAnimal] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [smoke, setSmoke] = useState<boolean>(false);
  const [chatOptionId, setChatOptionId] = useState<number | string>("");
  const [musicOptionId, setMusicOptionId] = useState<number | string>("");
  const {
    loading: aboutLoading,
    error: aboutError,
    data: aboutData,
  } = useQuery(GET_ABOUT);

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

  const [createAbout, { loading: createLoading, error: createError }] =
    useMutation(CREATE_ABOUT);
  const [updateAbout, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_ABOUT);
  const navigate = useNavigate();

  useEffect(() => {
    if (!aboutLoading && aboutData && aboutData.userLogged.userInfo.about) {
      const { animal, description, smoke, chatOption, musicOption } =
        aboutData.userLogged.userInfo.about;
      setAnimal(animal || false);
      setDescription(description || "");
      setSmoke(smoke || false);
      setChatOptionId(chatOption?.id ? parseInt(chatOption.id) : ""); // Convert the id to an integer if provided
      setMusicOptionId(musicOption?.id ? parseInt(musicOption.id) : ""); // Convert the id to an integer if provided
    }
  }, [aboutLoading, aboutData]);

  const BackToProfile = () => {
    window.history.back();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const variables = {
      animal,
      description,
      smoke,
      chatOptionId,
      musicOptionId,
    };

    const updateAboutId = aboutData?.userLogged?.userInfo?.about?.id;

    if (updateAboutId) {
      updateAbout({
        variables: {
          updateAboutId,
          ...variables,
        },
      })
        .then(() => {
          toast.success("Vos préférences ont été mises à jour avec succès !");
          navigate("/profile");
        })
        .catch((error) => {
          toast.error(
            `Erreur lors de la mise à jour de vos préférences : ${error.message}`
          );
        });
    } else {
      createAbout({ variables })
        .then(() => {
          toast.success("Vos préférences ont été ajoutées avec succès !");
          navigate("/profile");
        })
        .catch((error) => {
          toast.error(
            `Erreur lors de l'ajout de vos préférences : ${error.message}`
          );
        });
    }
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
    <div className="w-full flex-grow min-h-[calc(100vh-10rem)] pt-5">
      <h2 className="mb-4 text-center text-layoutBlue">Mes préférences</h2>
      <div className="grid w-5/6 p-8 m-auto my-4 border-2 md:w-1/2 border-validBlue">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
            <label className="mb-2 font-semibold">
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
            <label className="mb-2 font-semibold">
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
            <label className="mb-2 font-semibold">
              Etes-vous bavard en voiture ?
            </label>
            <select
              value={chatOptionId}
              onChange={(e) => setChatOptionId(Number(e.target.value) || "")}
              className="px-2 py-1 border"
            >
              <option value=""></option>
              {chatOptions.map((option: { id: number; content: string }) => (
                <option key={option.id} value={option.id}>
                  {option.content}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
            <label className="mb-2 font-semibold">
              Quel genre de musique écoutez-vous ?
            </label>
            <select
              value={musicOptionId}
              onChange={(e) => setMusicOptionId(Number(e.target.value) || "")}
              className="px-2 py-1 border"
            >
              <option value=""></option>
              {musicOptions.map((option: { id: number; content: string }) => (
                <option key={option.id} value={option.id}>
                  {option.content}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-5/6 mb-4 md:w-1/2">
            <label className="mb-2 font-semibold">Description</label>
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
