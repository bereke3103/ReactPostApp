import React, { useContext } from 'react';
import MyInput from '../UI/input/MyInput';
import MyButton from '../UI/button/MyButton';
import { AuthContext } from '../context/index.js';
const Login = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const login = (e) => {
    e.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', true);
  };
  return (
    <div style={{ marginTop: 15 }}>
      <h1>Страница для логина</h1>
      <form style={{ marginTop: 15 }} onSubmit={login}>
        <MyInput type="text" placeholder="Введите логин" />
        <MyInput
          style={{ marginTop: 15 }}
          type="password"
          placeholder="Введите пароль"
        />
        <MyButton style={{ marginTop: 15 }}>Войти</MyButton>
      </form>
    </div>
  );
};

export default Login;
