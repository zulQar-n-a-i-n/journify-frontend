import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PrivateRoute = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  const accessToken = localStorage.getItem('access');
  const loginStatus = localStorage.getItem('isLoggedIn') === 'true';

  if (accessToken && loginStatus) {
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
  }

  setAuthChecked(true);
}, []);


  if (!authChecked) return null; // Or a loading spinner

  return isLoggedIn ? children : <Navigate to="/Login2" />;
};

export default PrivateRoute;
