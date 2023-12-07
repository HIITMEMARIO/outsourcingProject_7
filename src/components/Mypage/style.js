import styled from 'styled-components';

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
  border: 1px solid lightgrey;
  padding: 20px;
`;

export const StReviewComment = styled.div``;
