import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './router/myRouter';
import { AuthContext } from './context';
import MyLoader from './UI/Loader/MyLoader';

const AppRouter = () => {
  //Это мы взяли их Value через Provider(App.j)
  const { isAuth, setIsAuth, isLoadingAuth } = useContext(AuthContext);

  if (isLoadingAuth) {
    return <MyLoader />;
  }

  return (
    <Routes>
      {isAuth ? (
        <>
          {privateRoutes.map((privateRoute) => (
            <Route
              key={privateRoute.path}
              path={privateRoute.path}
              element={<privateRoute.element />}
            />
          ))}
          <Route path="*" element={<Navigate to="/posts" />} />
        </>
      ) : (
        <>
          {publicRoutes.map((publicRoute) => (
            <Route
              key={publicRoute.path}
              path={publicRoute.path}
              element={<publicRoute.element />}
            />
          ))}
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
