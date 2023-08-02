import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const [isTokenRemoved, setTokenRemoved] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setTokenRemoved(true);
  };

  if (isTokenRemoved) {
    navigate('/');
  }

  return <button onClick={handleLogout}>LogOut</button>;
};

export default LogoutButton;
