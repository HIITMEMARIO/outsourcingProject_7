import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Register() {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const doSignUp = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/register',
        inputValue,
      );
      setCookie('accessToken', data['accessToken'], { path: '/' });
    } catch (error) {
      console.log(error);
    }
  };
  const [cookies, setCookie, removeCookie] = useCookies();

  return (
    <div>
      <input name="email" onChange={inputChangeHandler} />
      <input name="password" type="password" onChange={inputChangeHandler} />
      <button onClick={doSignUp}>회원가입</button>
    </div>
  );
}

export default Register;
