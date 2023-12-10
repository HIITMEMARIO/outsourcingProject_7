import styled from 'styled-components';

export const StMapContainer = styled.div`
  width: 100%;
  display: flex;
  display: flex;
  border-radius: 10px;
  border: 1px solid #7a97ff;
  margin-top: 100px;
  align-self: center;
  justify-content: center;
  align-self: center;
  justify-content: center;
`;

export const StInputBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  svg {
    width: 40px;
    height: 50px;
    display: flex;
    align-items: center;
  }
`;

export const StInput = styled.input`
  width: 800px;
  height: 50px;
  border: 1px solid #7a97ff;
  border-radius: 10px;
  font-weight: 800;
  text-align: center;
`;

export const StContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

export const StHospitalInfo = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #7a97ff;
  width: 700px;
  height: 300px;
  margin: 50px;
  border-radius: 10px;
  padding: 20px;
  background-color: white;
`;

export const StCommentsBox = styled.div`
  margin: 100px;
  width: 800px;
  border: 1px solid #7a97ff;
  border-radius: 10px;
  background-color: #c3ebff;
`;

export const StComment = styled.div`
  width: 700px;
  height: 40px;
  background-color: white;
  border-radius: 10px;
  padding-top: 10px;
  margin-left: 50px;
  margin-right: 50px;
  border: 1px solid #7a97ff;
`;

export const StReviewComment = styled.input`
  width: 700px;
  height: 100px;
  background-color: white;
  border-radius: 10px;
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 20px;
  border: 1px solid #7a97ff;
  text-align: center;
`;

export const StBtn = styled.button`
  border: 1px solid #7a97ff;
  margin-inline-start: 600px;
  background-color: lightgrey;
  width: 80px;
  height: 30px;
  border-radius: 10px;
`;

export const StUserIDAndCreatedAt = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 20px;
`;

export const StReviewBox = styled.div`
  background-color: #c3ebff;
  height: 120px;
`;

export const StFormBox = styled.div`
  background-color: #c3ebff;
  padding-bottom: 50px;
  border-radius: 10px;
`;

export const StUserId = styled.div``;

export const StCreatedAt = styled.div``;

export const StModal = styled.div`
  width: 358px;
  display: flex;
  z-index: 300;
  background-color: #fff;
  border-left: 1px solid #7a97ff;
  opacity: 0.9;
  flex-direction: column;

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

export const StMemoInput = styled.input`
  border-radius: 10px;
  border: 1px solid black;
  font-size: 16px;
  width: 300px;
`;

export const StMemoBox = styled.div`
  position: absolute;
  background-color: red;

  h1 {
    font-size: 30px;
    margin-bottom: 20px;
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

  &:hover {
    background-color: #c3ebff;
  }
`;
