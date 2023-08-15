import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const [isTokenRemoved, setTokenRemoved] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setTokenRemoved(true);
  };

  useEffect(() => {
    if (isTokenRemoved) {
      navigate('/');
    }
  }, [isTokenRemoved, navigate]);


  return <button onClick={handleLogout} className='w-fit h-fit'>LogOut</button>;
};

export default LogoutButton;
