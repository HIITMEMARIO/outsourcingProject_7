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
// import '../Main/modal.css';
import MyReview from './MyReview';
import MySchedule from './MySchedule';
import { StProfileContainer } from './style';

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

  useEffect(() => {
    dispatch(__getBooking());
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
    setSelectedBookingId(id);
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
        <MySchedule
          booking={booking}
          nickname={nickname}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedBookingId={selectedBookingId}
          editBookingToggle={editBookingToggle}
          deleteBooking={deleteBooking}
        />

        <MyReview
          myReview={myReview}
          isEdit={isEdit}
          selectedReviewId={selectedReviewId}
          setNewComment={setNewComment}
          deleteReview={deleteReview}
          editToggle={editToggle}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setIsEdit={setIsEdit}
        />
      </StProfileContainer>
    </div>
  );
}
