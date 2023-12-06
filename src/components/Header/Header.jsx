import React from 'react';
import { StContainer, StLogoBox } from './style';
import myappologo from 'assets/myappologo.png';

export default function Header() {
  return (
    <StContainer>
      <StLogoBox>
        <img src={myappologo} alt="logoIMG" />
        <p>My아포</p>
      </StLogoBox>
    </StContainer>
  );
}
