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
import { __getBooking } from '../../redux/modules/bookingSlice';
import { format, setHours, setMinutes } from 'date-fns';

export default function Modal({ setIsModalOpen, render, setRender }) {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setNickname(user.displayName);
    });
  }, []);

  const dispatch = useDispatch();

  const [nickname, setNickname] = useState('');

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 0),
  );
  const koreaTimeZoneDate = new Date(startDate.getTime());
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const data = useSelector((state) => {
    return state.mapSlice.data;
  });

  const booking = async () => {
    await bookingAxios.post('/booking', {
      id: uuid(),
      nickname: nickname,
      date: format(koreaTimeZoneDate, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
      hospital: data.id,
      hospitalName: data.place_name,
    });
    dispatch(__getBooking());
    setRender(!render);
    toast.success('예약 되셨습니다!');
    setIsModalOpen(false);
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
            showTimeSelect
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy년 MM월 dd일 hh시 mm분"
            filterTime={filterPassedTime}
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
