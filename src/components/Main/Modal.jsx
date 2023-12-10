import React, { useEffect, useState } from 'react';
import { StButtonBox, StModal, Stbutton } from './style';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './modal.css';
import { ko } from 'date-fns/esm/locale';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from 'shared/firebase';
import bookingAxios from 'api/booking';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';

export default function Modal({ setIsModalOpen }) {
  const [nickname, setNickname] = useState('');
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setNickname(user.displayName);
    });
  }, []);

  const data = useSelector((state) => {
    return state.mapSlice.data;
  });

  const [startDate, setStartDate] = useState(new Date());
  const booking = async () => {
    const response = await bookingAxios.post('/booking', {
      id: uuid(),
      nickname: nickname,
      date: dateFormatChange,
      hospital: data.id,
      hospitalName: data.place_name,
    });
    toast.success('예약 되셨습니다!');
    setIsModalOpen(false);
  };

  const dateFormatChange =
    startDate.getFullYear() +
    '년 ' +
    (startDate.getMonth() + 1) +
    '월 ' +
    startDate.getDate() +
    '일';
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
        </StModal>
      ) : (
        ''
      )}
    </>
  );
}
