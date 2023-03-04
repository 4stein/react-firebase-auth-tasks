import { useLayoutEffect, useState } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Login, Signup } from './pages';
import Home from './pages/Home/Home';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useLayoutEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuth(true);
    }
  }, []);

  const addToken = () => {
    setIsAuth(true);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? (
              <Home removeToken={removeToken} />
            ) : (
              <Login addToken={addToken} />
            )
          }
        />
        <Route path="/signup" element={<Signup addToken={addToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
