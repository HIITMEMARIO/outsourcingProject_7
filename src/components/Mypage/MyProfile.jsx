import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  __deleteReview,
  __editReview,
  __getReview,
} from '../../redux/modules/reviewSlice';
import { __deleteBooking } from '../../redux/modules/bookingSlice';
import { auth } from 'shared/firebase';
import { __getBooking } from '../../redux/modules/bookingSlice';
import { useNavigate } from 'react-router-dom';

export default function MyProfile() {
  const [nickname, setNickname] = useState('');
  // const [bookingData, setBookingData] = useState();
  const navigate = useNavigate();
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
        const idFiltered = getBooking.payload.filter((item) => {
          return item.nickname === nickname;
        });

        // setBookingData(idFiltered);
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

  const editDate = (id) => {
    if (
      window.confirm('날짜를 수정하시겠습니까? 확인 누르면 예약페이지로 이동함')
    ) {
      dispatch(__deleteBooking(id)).then(() => {
        dispatch(__getBooking());
        // navigate('/', { state: { value: bookingData } });
      });
    }
  };

  // const deleteBooking = async (id) => {
  //   if (window.confirm('삭제하시겠습니까?')) {
  //     try {
  //       await dispatch(__deleteBooking(id));
  //       await dispatch(__getBooking());
  //     } catch (error) {
  //       console.error('error', error);
  //     }
  //   }
  // };

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

  const editToggle = (id) => {
    setIsEdit(!isEdit);

    if (!isEdit) {
      setNewComment('');
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
              return item.nickname === nickname;
            })
            .map((item) => {
              return (
                <div key={item.id}>
                  <StScheduleBox>
                    <div>{item.date}</div>
                    <div>{item.hospitalName}</div>
                    <div>{item.nickname}</div>
                    <button
                      onClick={() => {
                        editDate(item.id);
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        deleteBooking(item.id);
                      }}
                    >
                      삭제
                    </button>
                  </StScheduleBox>
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

        <StReviewContainer>
          {myReview?.map((item) => {
            return (
              <div key={item.id}>
                <div style={{ marginLeft: '550px', marginBottom: '10px' }}>
                  {item.createdAt}
                </div>
                <StReviewBox>
                  {isEdit ? (
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
                  {isEdit ? (
                    <>
                      <StEditBtn onClick={() => editToggle(item.id)}>
                        수정완료
                      </StEditBtn>
                      <StEditBtn>취소하기</StEditBtn>
                    </>
                  ) : (
                    <>
                      <StEditBtn onClick={editToggle}>수정하기</StEditBtn>
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
              </div>
            );
          })}
        </StReviewContainer>
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
`;

export const StScheduleBox = styled.div`
  width: 200px;
  height: 200px;
  border: none;
  border-radius: 30px;
  background-color: #c3ebff;
  margin-bottom: 50px;
  box-shadow: 15px 15px lightgray;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: all 0.2s;
  }
`;

export const StReviewContainer = styled.div`
  height: 200px;
  /* margin-bottom: 30px; */
`;

export const StReviewBox = styled.div`
  display: block;
  width: 700px;
  height: 100px;
  margin-bottom: 30px;
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

// export const StReviewComment = styled.div``;
