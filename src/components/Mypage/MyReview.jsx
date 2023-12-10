import React from 'react';
import '../Main/modal.css';
import styled from 'styled-components';

export default function MyReview({
  myReview,
  isEdit,
  selectedReviewId,
  setNewComment,
  editToggle,
  deleteReview,
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
        })
      ) : (
        <p>내가 쓴 리뷰가 없습니다.</p>
      )}
    </>
  );
}

export const StReviewBox = styled.div`
  display: block;
  width: 700px;
  height: 100px;
  margin-bottom: 20px;
  border-radius: 40px;
  border: 1px solid lightgrey;
  padding: 20px;
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
export const StBtns = styled.div`
  margin-left: 480px;
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

export const StReviewContainer = styled.div`
  height: 200px;
  margin-bottom: 100px;
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
