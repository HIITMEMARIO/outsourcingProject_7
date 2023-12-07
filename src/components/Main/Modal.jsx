import React from 'react';
import { StModal } from './style';

export default function Modal({ isModalOpen, setIsModalOpen }) {
  return (
    <StModal>
      <button
        onClick={() => {
          setIsModalOpen(false);
        }}
      >
        X
      </button>
    </StModal>
  );
}
