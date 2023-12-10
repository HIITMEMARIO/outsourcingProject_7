import React from 'react';
import styled from 'styled-components';
import EditBooking from './EditBooking';

export default function MySchedule({
  booking,
  nickname,
  isModalOpen,
  selectedBookingId,
  editBookingToggle,
  deleteBooking,
}) {
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
      <StScheduleContainer>
        {booking
          ?.filter((item) => {
            return item.nickname === nickname;
          })
          .map((item) => {
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
                    <div>{formattedDate}</div>
                    <div>{item.hospitalName}</div>
                    <div>{item.nickname}</div>
                  </StScheduleInfo>
                  <StBookingBtns>
                    {isModalOpen && selectedBookingId === item.id ? (
                      <>
                        <StBookingEditBtn onClick={() => editBookingToggle()}>
                          수정완료
                        </StBookingEditBtn>
                        <StBookingCancelBtn>취소하기</StBookingCancelBtn>
                        <EditBooking schedule={item} />
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
          })}
      </StScheduleContainer>
    </>
  );
}
export const StScheduleContainer = styled.div`
  display: flex;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 80px;
  margin: 0;
  margin-bottom: 100px;
`;

const StScheduleInfo = styled.div``;

const StBookingBtns = styled.div`
  display: flex;
  margin-left: 80px;
  gap: 10px;
`;

const StBookingCancelBtn = styled.div`
  border-radius: 30px;
  background-color: lightgray;
  width: 60px;
  height: 30px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: all 0.2s;
  }
`;
const StBookingEditBtn = styled.button`
  border-radius: 30px;
  background-color: lightgray;
  width: 60px;
  height: 30px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: all 0.2s;
  }
`;

export const StScheduleBox = styled.div`
  width: 200px;
  height: 200px;
  border: none;
  border-radius: 30px;
  background-color: #c3ebff;
  margin-bottom: 30px;
  box-shadow: 10px 10px lightgray;
`;
const StBookingDeleteBtn = styled.button`
  border-radius: 30px;
  background-color: lightgray;
  width: 60px;
  height: 30px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: all 0.2s;
  }
`;
