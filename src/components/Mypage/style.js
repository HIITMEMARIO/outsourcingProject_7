import styled from 'styled-components';

export const StProfileContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

//-----------------------------------------
// 내 스케쥴 관리
export const StScheduleContainer = styled.div`
  display: flex;
  text-align: center;
  justify-items: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 80px;
  margin: 0;
`;

export const StScheduleInfo = styled.div``;

export const StBookingBtns = styled.div`
  display: flex;
  margin-left: 300px;
  gap: 10px;
  margin-top: 100px;
`;

export const StBookingDate = styled.div``;
export const StBookingHospital = styled.div``;

export const StBookingCancelBtn = styled.div`
  border-radius: 10px;
  background-color: lightgray;
  width: 60px;
  height: 30px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: all 0.2s;
  }
`;
export const StBookingEditBtn = styled.button`
  border-radius: 10px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 200px;
  border: none;
  border-radius: 30px;
  background-color: #c3ebff;
  margin-bottom: 30px;
  box-shadow: 10px 10px lightgray;
`;
export const StBookingDeleteBtn = styled.button`
  border-radius: 10px;
  background-color: lightgray;
  width: 60px;
  height: 30px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: all 0.2s;
  }
`;

//--------------------------------------------

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
  border-radius: 10px;
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
  border-radius: 10px;
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
