import React, { useEffect, useState } from 'react';
import { StButtonBox, StModal, Stbutton } from '../Main/style';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './editBooking.css';
import { ko } from 'date-fns/esm/locale';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from 'shared/firebase';
import bookingAxios from 'api/booking';
import uuid from 'react-uuid';

export default function EditBooking() {
  const [nickname, setNickname] = useState('');
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setNickname(user.displayName);
    });
  }, []);
  // console.log('모달닉네임', nickname);

  const data = useSelector((state) => {
    return state.mapSlice.data;
  });

  const [startDate, setStartDate] = useState(new Date());
  console.log(startDate);
  console.log(data.place_name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDate, setNewDate] = useState();
  const booking = async () => {
    const response = await bookingAxios.post('/booking', {
      id: uuid(),
      nickname: nickname,
      date: dateFormatChange,
      hospital: data.id,
      hospitalName: data.place_name,
    });
    setIsModalOpen(false);
    console.log('부킹', response.data);
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
          <h1>{data.place_name} 예약 수정하기</h1>
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
