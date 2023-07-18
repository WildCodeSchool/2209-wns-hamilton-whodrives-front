import { CREATE_USER_INFO } from '../../queryMutation/mutations';
import React from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
  const [city, setCity] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [age, setAge] = React.useState(0);
  const [address, setAddress] = React.useState('');

  const [createUserInfo, { loading }] = useMutation(CREATE_USER_INFO);
  const navigate = useNavigate();

  const handleSubmit = (e:any) => {
    e.preventDefault();
    createUserInfo({
      variables: { city, country, age, address },
    })
      .then(() => {
        toast.success('Informations ajoutées avec succès');
        navigate('/profile');
      })
      .catch((error) => {
        toast.error(`Erreur lors de l'ajout des informations : ${error.message}`);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white border-2 border-blue-500 px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
            City
          </label>
          <input
            id="city"
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
            Country
          </label>
          <input
            id="country"
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
            Age
          </label>
          <input
            id="age"
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;

