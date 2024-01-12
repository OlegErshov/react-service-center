import React, { useState, useEffect } from 'react';
import './styles/utils.css';

const ApiJoke = () => {
  const [joke, setJoke] = useState({ setup: '', punchline: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    return localStorage.getItem('token') !== null;
  };

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const response = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
        const jokeData = await response.json();

        if (jokeData[0] && jokeData[0].setup && jokeData[0].punchline) {
          setJoke({ setup: jokeData[0].setup, punchline: jokeData[0].punchline });
        } else {
          console.error('Invalid joke data');
        }
      } catch (error) {
        console.error('Error fetching joke:', error.message);
      }
    };

    fetchJoke();
    setIsLoggedIn(checkLoginStatus());
  }, []);

  return (
    <div className='container'>
      {isLoggedIn ? (
        <div className="joke-container">
          <p className="joke-setup">{joke.setup}</p>
          <p className="joke-punchline">{joke.punchline}</p>
        </div>
      ) : (
        <p>Please log in to view the joke.</p>
      )}
    </div>
  );
};

export default ApiJoke;