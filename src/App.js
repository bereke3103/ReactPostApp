import { BrowserRouter } from 'react-router-dom';
import './styles/App.css';
import MyNavbar from './components/UI/navbar/MyNavbar';
import AppRouter from './components/AppRouter';
import { AuthContext } from './components/context';
import { useEffect, useState } from 'react';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    setIsLoadingAuth(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        setIsAuth: setIsAuth,
        isLoadingAuth: isLoadingAuth,
      }}
    >
      <BrowserRouter>
        <MyNavbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
