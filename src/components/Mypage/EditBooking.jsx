import React, { useEffect, useState } from 'react';
import { StButtonBox, StModal, Stbutton } from '../Main/style';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './editBooking.css';
import { ko } from 'date-fns/esm/locale';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from 'shared/firebase';
import { setHours, setMinutes } from 'date-fns';

import { __editBooking } from '../../redux/modules/bookingSlice';

export default function EditBooking({ schedule }) {
  console.log('선택한 스케줄', schedule);
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState('');
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setNickname(user.displayName);
    });
  }, []);

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 9),
  );

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  // console.log(startDate);
  // console.log(data.place_name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDate, setNewDate] = useState();
  const booking = async () => {
    dispatch(__editBooking({ newDate: dateFormatChange, id: schedule.id }));
    // const response = await bookingAxios.post('/booking', {
    //   id: uuid(),
    //   nickname: nickname,
    //   date: dateFormatChange,
    //   hospital: data.id,
    //   hospitalName: data.place_name,
    // });
    setIsModalOpen(false);
    // console.log('부킹', response.data);
  };

  const dateFormatChange =
    startDate.getFullYear() +
    '년 ' +
    (startDate.getMonth() + 1) +
    '월 ' +
    startDate.getDate() +
    '일' +
    +startDate.getHours() +
    '시' +
    +startDate.getMinutes() +
    '분';

  return (
    <>
      {!!nickname ? (
        <StModal>
          {/* <button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            X
          </button> */}
          <h1>예약 수정하기</h1>
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
