import axios from 'axios';

export default function useAuth() {
  const signUpHandler = (e) => {
    e.preventDefault();

    const { name, password, email } = Object.fromEntries(new FormData(e.target));

    if (!name || !password || !email) return;

    axios.post('/api/auth/signup', { name, password, email })
      .then(() => {
        window.location = '/';
      });
  };

  const signInHandler = (e) => {
    e.preventDefault();

    const { password, email } = Object.fromEntries(new FormData(e.target));

    if (!password || !email) return;

    axios.post('/api/auth/signin', { password, email })
      .then(() => {
        window.location = '/';
      });
  };

  const logoutHandler = () => {
    axios('/api/auth/logout')
      .then(() => {
        window.location = '/';
      });
  };

  return {
    signUpHandler,
    logoutHandler,
    signInHandler,
  };
}
