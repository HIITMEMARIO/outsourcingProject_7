import styled, { css } from 'styled-components';

export const StProfileContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

// 내 스케쥴 관리
export const StScheduleContainer = styled.div`
display: flex;
  text-align: center;
  justify-items: center;
 
${({ $myBooking }) => {
    if ($myBooking.length > 0) {
      return css`
   display: grid;
  grid-template-columns: repeat(2, 1fr);
  `
    }
  }}
    gap: 80px;
  margin: 0;
`;

export const StScheduleInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;
`;

export const StBookingBtns = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
`;

export const StBookingDate = styled.div`
  width: 300px;
  margin-bottom: 20px;
`;
export const StBookingHospital = styled.div`
  width: 300px;
`;

export const StBookingCancelBtn = styled.button`
  border-radius: 10px;
  background-color: lightgray;
  width: 100px;
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
  width: 100px;
  height: 30px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: all 0.2s;
  }
`;

export const StScheduleBox = styled.div`
  width: 500px;
  height: 250px;
  border: none;
  border-radius: 30px;
  background-color: #c3ebff;
  margin-bottom: 30px;
  box-shadow: 10px 10px lightgray;
`;
export const StBookingDeleteBtn = styled.button`
  border-radius: 10px;
  background-color: lightgray;
  width: 100px;
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
  /* margin-left: 480px; */
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
