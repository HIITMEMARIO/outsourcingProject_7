import React from 'react';
import { StContainer, StLogoBox } from './style';
import myappologo from 'assets/myappologo.png';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/modules/authSlice';
import TokenRemainingTime from './TokenRemainingTime';
import styled from 'styled-components';

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
          <NavWrapper>
            <TokenRemainingTime />
            <div>
              <NavBtn onClick={() => navigate('/mypage')}>Mypage</NavBtn>
              <NavBtn onClick={onHandleLoginBtn}>Logout</NavBtn>
            </div>
          </NavWrapper>
        </>
      ) : (
        <NavWrapper>
          <NavBtn onClick={onHandleLoginBtn}>로그인</NavBtn>
        </NavWrapper>
      )}
    </StContainer>
  );
}

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5rem;
  gap: 1rem;
`;
const NavBtn = styled.button`
  font-size: 30px;
  font-weight: 600;
  cursor: pointer;
`;
