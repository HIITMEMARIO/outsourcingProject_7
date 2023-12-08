import React, { forwardRef, useState } from 'react';
import {
  StButtonBox,
  StInputBox,
  StMemoBox,
  StMemoInput,
  StModal,
  StModalContainer,
  Stbutton,
} from './style';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './modal.css';
import { ko } from 'date-fns/esm/locale';
import { useSelector } from 'react-redux';

export default function Modal({ setIsModalOpen }) {
  const data = useSelector((state) => {
    return state.mapSlice.data;
  });

  const [startDate, setStartDate] = useState(new Date());
  console.log(startDate);

  return (
    <StModal>
      <button
        onClick={() => {
          setIsModalOpen(false);
        }}
      >
        X
      </button>
      <h1>{data.place_name} 예약하기</h1>
      <DatePicker
        locale={ko}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="yyyy년 MM월 dd일"
        minDate={new Date()}
      />
      <StButtonBox>
        <Stbutton
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          예약
        </Stbutton>
      </StButtonBox>
      {/* <StMemoBox>
        <h1>메모</h1>
        <StMemoInput maxLength={20} />
      </StMemoBox> */}
    </StModal>
  );
}
