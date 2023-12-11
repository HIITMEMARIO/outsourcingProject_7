import React from 'react';
import { StContainer, StLogoBox } from './style';
import { IoIosLogOut } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { CiLogin } from 'react-icons/ci';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import mainlogo from '../../assets/mainlogo.png';
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
        <img src={mainlogo} alt="logoIMG" />
      </StLogoBox>
      {isLogin ? (
        <>
          <NavWrapper>
            <TokenRemainingTime />
            <div>
              <NavBtn onClick={() => navigate('/mypage')}>
                <CgProfile
                  size={40}
                  color="Grey"
                  style={{ marginRight: '20px' }}
                />
              </NavBtn>
              <NavBtn onClick={onHandleLoginBtn}>
                <IoIosLogOut size={40} color="Grey" />
              </NavBtn>
            </div>
          </NavWrapper>
        </>
      ) : (
        <NavWrapper>
          <NavBtn onClick={onHandleLoginBtn}>
            <CiLogin size={50} color="Grey" />
          </NavBtn>
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
