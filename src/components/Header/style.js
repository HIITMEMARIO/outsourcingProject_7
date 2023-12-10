import styled from 'styled-components';

export const StContainer = styled.div`
  background-color: #c3ebff;
  display: flex;
  height: 100px;
  width: 100%;
  border-bottom: 1px solid #7a97ff;
  justify-content:space-between
`;

export const StLogoBox = styled.div`
cursor: pointer;
  width: 260px;
  height: 100px;
  /* background-color: rebeccapurple; */
  display: flex;
  align-items: center;
  img {
    /* background-color: red; */
    width: 60px;
    height: 60px;
    margin-left: 30px;
  }
  p {
    display: flex;
    align-items: center;
    height: 100px;
    margin-left: 5%;
    font-size: 30px;
    font-weight: 1000;
    font-family: 'ONE-Mobile-POP';
  }
`;
