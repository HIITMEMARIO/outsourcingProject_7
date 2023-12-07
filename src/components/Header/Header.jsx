import React, { useEffect } from 'react';
import { StContainer, StLogoBox } from './style';
import myappologo from 'assets/myappologo.png';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '@firebase/auth';
import { auth, onAuthStateChanged } from 'shared/firebase';
import { logout } from '../../redux/modules/authSlice';

export default function Header() {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('user', user);
    }
  });

  // useEffect(() => {
  //   const curruentUser = auth.currentUser;
  //   console.log(curruentUser);
  // }, []);
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.authSlice.isLogin);
  console.log(isLogin);
  const logOut = async () => {
    await signOut(auth);
  };
  const onHandleLoginBtn = () => {
    navigate('/login');
    if (isLogin) {
      logOut();
      dispatch(logout());
      localStorage.clear();
    }
  };
  return (
    <StContainer>
      <StLogoBox onClick={() => navigate('/')}>
        <img src={myappologo} alt="logoIMG" />
        <p>My아포</p>
      </StLogoBox>
      {isLogin ? (
        <div>
          <button onClick={() => navigate('/mypage')}>mypage</button>
          <button onClick={onHandleLoginBtn}>logout</button>
        </div>
      ) : (
        <button onClick={onHandleLoginBtn}>로그인</button>
      )}
    </StContainer>
  );
}
