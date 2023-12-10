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

  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.authSlice.isLogin);

  const onHandleLoginBtn = () => {
    navigate('/login');
    if (isLogin) {
      dispatch(logout());
    }
  };
  return (
    <StContainer>
      <StLogoBox onClick={() => navigate('/')}>
        <img src={myappologo} alt="logoIMG" />
        <p style={{ fontFamily: 'ONE-Mobile-POP' }}>My아포</p>
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
