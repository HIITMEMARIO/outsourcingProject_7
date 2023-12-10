import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { __addReview, __getReview } from '../../redux/modules/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  StBtn,
  StComment,
  StCommentsBox,
  StContainer,
  StCreatedAt,
  StFormBox,
  StHospitalInfo,
  StReviewBox,
  StReviewComment,
  StUserIDAndCreatedAt,
  StUserId,
} from './style';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'shared/firebase';
import { toast } from 'react-toastify';

export default function Review() {
  const [nickname, setNickname] = useState('');
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const { review } = useSelector((state) => state.reviewSlice);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setNickname(user.displayName);
      }
    });
  });

  const data = useSelector((state) => {
    return state.mapSlice.data;
  });

  const dataHospitalId = data.id;

  useEffect(() => {
    dispatch(__getReview());
  }, [dispatch]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!nickname) {
      toast.error('로그인 후 작성바랍니다');
      return;
    }
    if (comment === '') {
      toast.error('내용을 입력해주세요');
      return;
    }
    const newReview = {
      id: uuid(),
      comment,
      nickname: nickname,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      hospitalId: data.id,
      hospitalName: data.place_name,
    };

    dispatch(__addReview(newReview));
    setComment('');
  };

  const onReviewChange = (e) => {
    setComment(e.target.value);
  };
  if (!dataHospitalId) return;
  return (
    <>
      <StContainer>
        <StCommentsBox>
          <StHospitalInfo>
            <>
              <h2>{data.place_name}</h2>
              <div>{data.road_address_name}</div>
              <div> {data.phone}</div>
              <div> {data.place_url}</div>
            </>
          </StHospitalInfo>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: '550',
              marginBottom: '50px',
            }}
          >
            {data.place_name}의 리뷰보기
          </h1>
          {review
            .filter((item) => {
              return item.hospitalId === dataHospitalId;
            })
            .map((item) => {
              return (
                <div key={item.id}>
                  <StReviewBox>
                    <StUserIDAndCreatedAt>
                      <StUserId>작성자 : {item.nickname}</StUserId>
                      <StCreatedAt>{item.createdAt}</StCreatedAt>
                    </StUserIDAndCreatedAt>
                    <StComment>{item.comment}</StComment>
                  </StReviewBox>
                </div>
              );
            })}
          <StFormBox>
            <div>
              <form onSubmit={onSubmitHandler}>
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: '550',
                    marginTop: '50px',
                    marginBottom: '50px',
                  }}
                >
                  리뷰 작성하기
                </div>
                <StBtn type="submit">등록</StBtn>
              </form>
            </div>
            <StReviewComment
              type="text"
              placeholder="로그인 후 이용해주세요 (100자 이내)"
              value={comment}
              onChange={onReviewChange}
              maxLength={100}
            ></StReviewComment>
          </StFormBox>
        </StCommentsBox>
      </StContainer>
    </>
  );
}
