const checkTokenValidity = async () => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    if (!token) {
      // Token is missing, handle authentication error (redirect to login page, etc.)
      return false;
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/v1/verifyToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
  
      const data = await response.json();
  
      return data.valid; // The server should return whether the token is valid or not
    } catch (error) {
      // Token verification failed, handle error
      return false;
    }
  };

  export default checkTokenValidity
  