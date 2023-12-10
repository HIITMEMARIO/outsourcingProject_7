import React, { useEffect, useState } from 'react';
import { StButtonBox, StModal, Stbutton } from './style';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './modal.css';
import { ko } from 'date-fns/esm/locale';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from 'shared/firebase';
import axios from 'axios';
import bookingAxios from 'api/booking';
import uuid from 'react-uuid';

export default function Modal({ setIsModalOpen }) {
  const [nickname, setNickname] = useState('');
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setNickname(user.displayName);
    });
  }, []);
  console.log('모달닉네임', nickname);

  const data = useSelector((state) => {
    return state.mapSlice.data;
  });

  // console.log(data.)

  const [startDate, setStartDate] = useState(new Date());
  console.log(startDate);
  console.log(data.place_name);
  const booking = async () => {
    const response = await bookingAxios.post('/booking', {
      id: uuid(),
      nickname: nickname,
      date: startDate,
      hospital: data.id,
      hospitalName: data.place_name,
    });
    setIsModalOpen(false);
    console.log('부킹', response.data);
  };

  return (
    <>
      {!!nickname ? (
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
                booking();
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
      ) : (
        ''
      )}
    </>
  );
}
