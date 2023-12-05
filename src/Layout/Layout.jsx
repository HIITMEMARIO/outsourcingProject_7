import React from 'react';
// import Header from 'components/Header/Header';
// import Footer from 'components/Footer/Footer';
import { StContainer, StMain } from './styles';

export default function Layout({ children }) {
  return (
    <StContainer>
      <StMain>{children}</StMain>
    </StContainer>
  );
}
