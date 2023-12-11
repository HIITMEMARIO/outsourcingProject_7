import React from 'react';
import EditBooking from './EditBooking';
import {
  StScheduleInfo,
  StBookingBtns,
  StBookingCancelBtn,
  StBookingEditBtn,
  StScheduleBox,
  StBookingDeleteBtn,
  StScheduleContainer,
  StBookingDate,
  StBookingHospital,
} from './style';

export default function MySchedule({
  booking,
  nickname,
  isModalOpen,
  selectedBookingId,
  editBookingToggle,
  deleteBooking,
  setIsModalOpen,
}) {
  const myBooking = booking?.filter((item) => {
    return item.nickname === nickname;
  });

  return (
    <>
      <div
        style={{
          margin: '50px',
          fontSize: '30px',
        }}
      >
        나의 스케줄
      </div>
      <StScheduleContainer $myBooking={myBooking}>
        {myBooking.length > 0 ? (
          myBooking.map((item) => {
            const dateObject = new Date(item.date);

            const formattedDate = `${(dateObject.getFullYear() % 100)
              .toString()
              .padStart(2, '0')}년 ${(dateObject.getMonth() + 1)
              .toString()
              .padStart(2, '0')}월 ${dateObject
              .getDate()
              .toString()
              .padStart(2, '0')}일 ${dateObject
              .getHours()
              .toString()
              .padStart(2, '0')}시 ${dateObject
              .getMinutes()
              .toString()
              .padStart(2, '0')}분`;
            return (
              <div key={item.id}>
                <StScheduleBox>
                  <StScheduleInfo>
                    <StBookingDate>예약 날짜 : {formattedDate}</StBookingDate>
                    <StBookingHospital>
                      예약 병원 : {item.hospitalName}
                    </StBookingHospital>
                  </StScheduleInfo>
                  <StBookingBtns>
                    {isModalOpen && selectedBookingId === item.id ? (
                      <>
                        <StBookingEditBtn onClick={() => editBookingToggle()}>
                          수정완료
                        </StBookingEditBtn>
                        <StBookingCancelBtn
                          onClick={() => setIsModalOpen(false)}
                        >
                          취소하기
                        </StBookingCancelBtn>
                        <div>
                          <EditBooking
                            schedule={item}
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <StBookingEditBtn
                          onClick={() => editBookingToggle(item.id)}
                        >
                          수정하기
                        </StBookingEditBtn>

                        <StBookingDeleteBtn
                          onClick={() => deleteBooking(item.id)}
                        >
                          삭제하기
                        </StBookingDeleteBtn>
                      </>
                    )}
                  </StBookingBtns>
                </StScheduleBox>
              </div>
            );
          })
        ) : (
          <p>예약내역이 없습니다.</p>
        )}
      </StScheduleContainer>
    </>
  );
}
