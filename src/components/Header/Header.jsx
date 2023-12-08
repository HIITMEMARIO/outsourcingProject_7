import React, { useEffect } from 'react';
import { StContainer, StLogoBox } from './style';
import myappologo from 'assets/myappologo.png';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '@firebase/auth';
import { auth } from 'shared/firebase';
import { logout } from '../../redux/modules/authSlice';
import TokenRemainingTime from './TokenRemainingTime';

export default function Header() {
  const dispatch = useDispatch();

  //확인용
  // const a = auth.currentUser;
  // console.log('a', a);
  // useEffect(() => {
  //   // const a = auth.currentUser;

  //   console.log('dddddddddddddddddddddddddddddd', a);
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
    }
  };
  return (
    <StContainer>
      <StLogoBox onClick={() => navigate('/')}>
        <img src={myappologo} alt="logoIMG" />
        <p>My아포</p>
      </StLogoBox>
      {isLogin ? (
        <>
          <TokenRemainingTime />
          <div>
            <button onClick={() => navigate('/mypage')}>mypage</button>
            <button onClick={onHandleLoginBtn}>logout</button>
          </div>
        </>
      ) : (
        <button onClick={onHandleLoginBtn}>로그인</button>
      )}
    </StContainer>
  );
}
