import React from 'react';
<<<<<<< HEAD

import { StContainer, StMain } from './styles';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
=======
import { StContainer, StMain } from './styles';
>>>>>>> f529e323cc0022742886acaf7a3b130702ba408a

export default function Layout({ children }) {
  return (
    <StContainer>
      <StMain>{children}</StMain>
    </StContainer>
  );
}
