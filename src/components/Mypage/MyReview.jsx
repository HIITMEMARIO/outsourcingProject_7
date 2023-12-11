import React from 'react';
import '../Main/modal.css';

import {
  StBtns,
  StEditBtn,
  StP,
  StRemoveBtn,
  StReviewBox,
  StReviewContainer,
  Textarea,
} from './style';

export default function MyReview({
  myReview,
  isEdit,
  setIsEdit,
  selectedReviewId,
  setNewComment,
  editToggle,
  deleteReview,
  isModalOpen,
  setIsModalOpen,
}) {
  return (
    <>
      <div
        style={{
          margin: '50px',
          fontSize: '30px',
        }}
      >
        내가 쓴 리뷰
      </div>
      {myReview.length > 0 ? (
        myReview?.map((item) => {
          return (
            <StReviewContainer key={item.id}>
              <div
                style={{
                  marginBottom: '10px',
                  gap: '50px',
                }}
              >
                {item.hospitalName} &nbsp;
                {item.createdAt}
              </div>

              <StReviewBox>
                {isEdit && selectedReviewId === item.id ? (
                  <>
                    <Textarea
                      maxLength={100}
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
                    <StEditBtn
                      onClick={() => {
                        setIsEdit(!isEdit);
                      }}
                    >
                      취소하기
                    </StEditBtn>
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
        })
      ) : (
        <StP>작성한 리뷰가 없습니다.</StP>
      )}
    </>
  );
}
