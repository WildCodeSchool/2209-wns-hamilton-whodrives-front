import "../../styles/profile.css";
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_USER_LOGGED = gql`
  query UserLogged {
    userLogged {
      id
      email
      username
      firstname
      lastname
      date_of_birth
      phone
    }
  }
`;
const AboutMeComponent = () => {
  const token = localStorage.getItem('token');

  const { loading, error, data } = useQuery(GET_USER_LOGGED, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error retrieving user information.</div>;
  }

  const user = data.userLogged;

  return (
    <div>
      <h1>Informations de l'utilisateur</h1>
      <p>Email : {user.email}</p>
      <p>username : {user.username}</p>
      <p>firstname : {user.firstname}</p>
      <p>lastname : {user.lastname}</p>
      <p>date_of_birth : {user.date_of_birth}</p>
      <p>phone : {user.phone}</p>
    </div>
  );
};

export default AboutMeComponent;

