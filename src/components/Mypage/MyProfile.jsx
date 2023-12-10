import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  __deleteReview,
  __editReview,
  __getReview,
} from '../../redux/modules/reviewSlice';
import {
  __deleteBooking,
  __editBooking,
} from '../../redux/modules/bookingSlice';
import { auth } from 'shared/firebase';
import { __getBooking } from '../../redux/modules/bookingSlice';
import { useNavigate } from 'react-router-dom';
import Modal from 'components/Main/Modal';
import '../Main/modal.css';
import EditBooking from './EditBooking';

export default function MyProfile() {
  const [nickname, setNickname] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [newDate, setNewDate] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setNickname(user.displayName);
    });
  }, []);
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const { review, isLoading } = useSelector((state) => state.reviewSlice);
  const { booking } = useSelector((state) => state.bookingSlice);

  const myReview = review.filter((item) => {
    return item.nickname === nickname;
  });

  useEffect(() => {
    const getBookingData = async () => {
      try {
        const getBooking = await dispatch(__getBooking());
        getBooking.payload.filter((item) => {
          return item.nickname === nickname;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getBookingData();
  }, [nickname]);

  const deleteBooking = async (id) => {
    if (window.confirm('삭제하시겠습니까?')) {
      await dispatch(__deleteBooking(id));
      await dispatch(__getBooking());
    }
  };

  console.log('이거 찾아보자', booking);

  useEffect(() => {
    dispatch(__getBooking());
  }, [nickname]);

  useEffect(() => {
    dispatch(__getReview());
  }, [nickname]);

  const deleteReview = (id) => {
    if (window.confirm('삭제하시겠습니까?')) {
      dispatch(__deleteReview(id)).then(() => {
        dispatch(__getReview());
      });
    }
  };

  if (isLoading) {
    return <p>로딩 중 ..</p>;
  }

  const editBookingToggle = (id) => {
    setIsModalOpen(!isModalOpen);
    // setSelectedBookingId(id);

    if (!isModalOpen) {
      setNewDate('');
      return;
    }
    dispatch(__editBooking({ id, newDate }));
    // if (isModalOpen === true) {
    //   if (window.confirm('이대로 수정을 진행하시겠습니까?')) {
    //   } else {
    //     return;
    //   }
    // }
  };

  const editToggle = (id) => {
    setIsEdit(!isEdit);

    if (!isEdit) {
      setNewComment('');
      setSelectedReviewId(id);
      return;
    }
    dispatch(__editReview({ id, newComment }));
    if (isEdit === true) {
      if (window.confirm('이대로 수정을 진행하시겠습니까?')) {
      } else {
        return;
      }
    }
  };

  return (
    <div>
      <StProfileContainer>
        <div
          style={{
            margin: '60px',
            paddingBottom: '70px',
            borderBottom: '1px solid lightgrey',
            fontSize: '40px',
          }}
        >
          <p>{nickname} 님, 반갑습니다 🖐🏻</p>
        </div>
        <div
          style={{
            margin: '50px',
            fontSize: '30px',
          }}
        >
          {/* 스케줄 박스 누르면 메인페이지 해당 주소로 이동하게 하기? */}
          나의 스케줄
        </div>
        <StScheduleContainer>
          {booking
            ?.filter((item) => {
              // console.log('dddd', item);
              return item.nickname === nickname;
            })
            .map((item) => {
              return (
                <div key={item.id}>
                  <StScheduleBox>
                    <div>{item.date}</div>
                    <div>{item.hospitalName}</div>
                    <div>{item.nickname}</div>
                  </StScheduleBox>
                  <StBookingBtns>
                    {isModalOpen ? (
                      <>
                        <StBookingEditBtn
                          onClick={() => editBookingToggle(item.id)}
                        >
                          수정완료
                          <EditBooking />
                        </StBookingEditBtn>
                        <StBookingCancelBtn>취소하기</StBookingCancelBtn>
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
                </div>
              );
            })}
        </StScheduleContainer>
        <div
          style={{
            margin: '50px',
            fontSize: '30px',
          }}
        >
          내가 쓴 리뷰
        </div>

        {/* <StReviewContainer> */}
        {myReview?.map((item) => {
          return (
            <StReviewContainer key={item.id}>
              <div
                style={{
                  marginBottom: '10px',
                  gap: '50px',
                }}
              >
                {item.hospitalName}
                {item.createdAt}
              </div>

              <StReviewBox>
                {isEdit && selectedReviewId === item.id ? (
                  <>
                    <Textarea
                      autoFocus
                      defaultValue={item.comment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                  </>
                ) : (
                  <>{item.comment}</>
                )}
              </StReviewBox>

              <StBtns>
                {isEdit && selectedReviewId === item.id ? (
                  <>
                    <StEditBtn onClick={() => editToggle(item.id)}>
                      수정완료
                    </StEditBtn>
                    <StEditBtn>취소하기</StEditBtn>
                  </>
                ) : (
                  <>
                    <StEditBtn onClick={() => editToggle(item.id)}>
                      수정하기
                    </StEditBtn>
                    <StRemoveBtn
                      onClick={() => {
                        deleteReview(item.id);
                      }}
                    >
                      삭제
                    </StRemoveBtn>
                  </>
                )}
              </StBtns>
            </StReviewContainer>
          );
        })}
        {/* </StReviewContainer> */}
      </StProfileContainer>
    </div>
  );
}

export const StProfileContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const StScheduleContainer = styled.div`
  display: flex;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 80px;
  margin: 0;
  margin-bottom: 100px;
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

export const StReviewContainer = styled.div`
  height: 200px;
  margin-bottom: 100px;
`;

export const StReviewBox = styled.div`
  display: block;
  width: 700px;
  height: 100px;
  margin-bottom: 20px;
  border-radius: 40px;
  border: 1px solid lightgrey;
  padding: 20px;
`;

export const StRemoveBtn = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 40px;
  margin-left: 10px;
  background-color: lightgrey;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: all 0.2s;
  }
`;

export const StEditBtn = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 40px;
  background-color: lightgrey;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: all 0.2s;
  }
`;

export const StBtns = styled.div`
  margin-left: 480px;
`;

export const Textarea = styled.textarea`
  display: block;
  width: 700px;
  height: 100px;
  margin-bottom: 20px;
  border-radius: 40px;
  border: none;
  padding: 20px;
  resize: none;
  padding: 10px;
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
