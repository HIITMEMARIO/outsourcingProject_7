import React from 'react';
import { StContainer, StMain } from './styles';

export default function Layout({ children }) {
  return (
    <StContainer>
      <StMain>{children}</StMain>
    </StContainer>
  );
}
