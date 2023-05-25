import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated ;
  return (
    <div>
      {isAuthenticated ? <h1>Hello World! Connected</h1> : <h1>not connected ! </h1>}

    </div>
  );
};

export default HomePage;
