import React, { useEffect, useState } from 'react';
import { StButtonBox, StModal, Stbutton } from '../Main/style';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './editBooking.css';
import { ko } from 'date-fns/esm/locale';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from 'shared/firebase';
import { format, setHours, setMinutes } from 'date-fns';

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
    setHours(setMinutes(new Date(), 0), 0),
  );
  const koreaTimeZoneDate = new Date(startDate.getTime());
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const booking = async () => {
    dispatch(__editBooking({ newDate: dateFormatChange, id: schedule.id }));
  };

  const dateFormatChange = format(
    koreaTimeZoneDate,
    "yyyy-MM-dd'T'HH:mm:ss.SSS",
  );

  return (
    <>
      {!!nickname ? (
        <StModal>
          <StButtonBox></StButtonBox>
          <DatePicker
            locale={ko}
            showTimeSelect
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy년 MM월 dd일 hh시 mm분"
            filterTime={filterPassedTime}
            minDate={new Date()}
          />
          <Stbutton
            onClick={() => {
              booking();
            }}
          >
            예약
          </Stbutton>
        </StModal>
      ) : (
        ''
      )}
    </>
  );
}
