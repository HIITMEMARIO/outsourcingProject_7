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

export const StReviewComment = styled.div``;

export const StModal = styled.div`
  position: relative;
  width: 380px;
  height: 600px;
  display: flex;
  z-index: 300;
  background-color: #fff;
  border: 1px solid #7a97ff;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;

  .react-datepicker {
    left: 0px !important;
    position: absolute;
    border: 1px solid #7a97ff !important;
  }

  button {
    align-self: flex-start;
    padding: 20px;
    font-weight: 800;
    font-size: 20px;
    transition: all.1s;
    cursor: pointer;

    &:hover {
      color: #7a97ff;
    }
  }
  h1 {
    font-weight: 1000;
    font-size: 18px;
    text-align: center;
  }
`;

export const StButtonBox = styled.div`
  width: 300px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 50px;
`;
export const Stbutton = styled.div`
  height: 30px;
  border: 1px solid #7a97ff;
  border-radius: 10px;
  background-color: #fff;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  cursor: pointer;
  transition: all.1s;
  position: relative;
  bottom: -70px;
  &:hover {
    background-color: #c3ebff;
  }
`;

export const StReviewBox = styled.div`
  position: relative;
  display: flex;
  width: 700px;
  height: 100px;
  margin-bottom: 20px;
  border-radius: 20px;
  border: 1px solid lightgrey;
  background-color: #fff;
  align-items: center;
  font-size: 18px;
  padding: 20px;
  z-index: 0;
`;

export const Textarea = styled.textarea`
  position: absolute;
  left: 0;
  width: 790px;
  height: 90px;
  border-radius: 20px;
  border: none;
  padding: 20px;
  resize: none;
  display: block;
  line-height: 50px;
  font-size: 18px;
  max-width: 100%;
`;
export const StBtns = styled.div`
  margin-left: 480px;
`;

export const StEditBtn = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 20px;
  background-color: lightgrey;
  margin-left: 10px;
  border: 1px solid #7a97ff;
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
  border-radius: 20px;
  margin-left: 10px;
  background-color: lightgrey;
  border: 1px solid #7a97ff;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: all 0.2s;
  }
`;
