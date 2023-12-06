import React from 'react';
import { StContainer, StMain } from './styles';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

export default function Layout({ children }) {
  return (
    <StContainer>
      <Header />
      <StMain>{children}</StMain>
      <Footer />
    </StContainer>
  );
}
