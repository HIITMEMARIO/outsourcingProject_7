import React, { useState } from 'react';
import { StModal } from './style';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

export default function Modal({ setIsModalOpen }) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <StModal>
      <button
        onClick={() => {
          setIsModalOpen(false);
        }}
      >
        X
      </button>
      <h1>예약하기</h1>

      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </StModal>
  );
}
