import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { __addReview, __getReview } from '../../redux/modules/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   StBtn,
//   StComment,
//   StCommentsBox,
//   // StContainer,
//   StCreatedAt,
//   StFormBox,
//   // StHospitalInfo,
//   StReviewBox,
//   StReviewComment,
//   StUserIDAndCreatedAt,
//   StUserId,
// } from './style';
import styled from 'styled-components';

export default function Review() {
  const [comment, setComment] = useState('');
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();
  const { review } = useSelector((state) => state.reviewSlice);

  console.log('review', review);

  useEffect(() => {
    dispatch(__getReview());
  }, [dispatch]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (comment === '') {
      alert('내용을 입력해주세요');
      return;
    }
    const newReview = {
      id: uuid(),
      comment,
      userId,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };

    dispatch(__addReview(newReview));
    setUserId('');
    setComment('');
  };

  const onReviewChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      <StContainer>
        <StCommentsBox>
          <StHospitalInfo>
            <div>Hospital Information</div>
          </StHospitalInfo>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: '550',
              marginBottom: '50px',
            }}
          >
            병원이름의 리뷰보기
          </h1>

          {review &&
            review.map((item) => {
              return (
                <div key={item.id}>
                  <StReviewBox>
                    <StUserIDAndCreatedAt>
                      <StUserId>{item.userId}</StUserId>
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
            >
              {/* 로그인한 유저만 댓글 작성 가능 */}
            </StReviewComment>
          </StFormBox>
        </StCommentsBox>
      </StContainer>
    </>
  );
}

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  /* align-items: center; */
  padding-bottom: 0px;
`;

const StHospitalInfo = styled.div`
  display: flex;
  border: 1px solid darkgray;
  width: 700px;
  height: 300px;
  margin: 50px;
  border-radius: 30px;
  padding: 20px;
  background-color: white;
`;

const StCommentsBox = styled.div`
  width: 800px;
  height: 1100px;
  border: none;
  border-radius: 30px;
  background-color: #c3ebff;
`;

const StComment = styled.div`
  width: 700px;
  height: 40px;
  border: none;
  background-color: white;
  border-radius: 30px;
  padding-top: 10px;
  margin-left: 50px;
  margin-right: 50px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  /* margin-bottom: 50px; */
`;

const StReviewComment = styled.input`
  width: 700px;
  height: 100px;
  border: none;
  background-color: white;
  border-radius: 30px;
  margin-left: 50px;
  margin-right: 50px;
  padding: 20px;
  /* margin-bottom: 30px; */
  margin-top: 20px;
  /* padding-top: 50px; */
`;

const StBtn = styled.button`
  border: 1px solid lightgray;
  margin-inline-start: 600px;
  background-color: lightgrey;
  width: 80px;
  height: 30px;
  border-radius: 30px;
`;

const StUserIDAndCreatedAt = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 20px;
`;

const StReviewBox = styled.div`
  background-color: #c3ebff;
  height: 120px;
  /* border-radius: 30px; */
  /* margin-bottom: 30px; */
`;

const StFormBox = styled.div`
  background-color: #c3ebff;
  padding-bottom: 50px;
  border-radius: 30px;
`;

const StUserId = styled.div``;

const StCreatedAt = styled.div``;
