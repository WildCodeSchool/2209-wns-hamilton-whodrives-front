import {GET_MUSIC_OPTIONS,GET_CHAT_OPTIONS } from '../../queryMutation/query';
import {CREATE_ABOUT} from '../../queryMutation/mutations';
import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';





const AboutForm = () => {
  const [animal, setAnimal] = useState(false);
  const [description, setDescription] = useState('');
  const [smoke, setSmoke] = useState(false);
  const [chatOptionId, setChatOptionId] = useState('');
  const [musicOptionId, setMusicOptionId] = useState('');

  const { loading: musicLoading, error: musicError, data: musicData } = useQuery(
    GET_MUSIC_OPTIONS
  );

  const { loading: chatLoading, error: chatError, data: chatData } = useQuery(
    GET_CHAT_OPTIONS
  );

  const [createAbout, { loading, error }] = useMutation(CREATE_ABOUT);

  const handleSubmit = (e:any) => {
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
        console.log('Mutation réussie', data);
      })
      .catch((error) => {
        // Gérer l'erreur de la mutation ici
        console.log('Erreur de la mutation', error);
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
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-md">
        <label className="mb-4">
          Animal:
          <input
            type="checkbox"
            checked={animal}
            onChange={(e) => setAnimal(e.target.checked)}
          />
        </label>
        <br />
        <label className="mb-4">
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="ml-2 border rounded-md px-2 py-1"
          />
        </label>
        <br />
        <label className="mb-4">
          Smoke:
          <input
            type="checkbox"
            checked={smoke}
            onChange={(e) => setSmoke(e.target.checked)}
          />
        </label>
        <br />
        <label className="mb-4">
          Chat Option:
          <select
            value={chatOptionId}
            onChange={(e) => setChatOptionId(e.target.value)}
            className="ml-2 border rounded-md px-2 py-1"
          >
            <option value="">Select an option</option>
            {chatOptions.map((option: { id: string; content: string }) => (
              <option key={option.id} value={option.id}>
                {option.content}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label className="mb-4">
          Music Option:
          <select
            value={musicOptionId}
            onChange={(e) => setMusicOptionId(e.target.value)}
            className="ml-2 border rounded-md px-2 py-1"
          >
            <option value="">Select an option</option>
            {musicOptions.map((option: { id: string; content: string }) => (
              <option key={option.id} value={option.id}>
                {option.content}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AboutForm;

