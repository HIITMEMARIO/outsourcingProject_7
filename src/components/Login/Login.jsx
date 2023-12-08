import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { __loginUser, __signupUser } from '../../redux/modules/authSlice';
import useForm from 'Hooks/userForm';
import { useNavigate } from 'react-router-dom';
import { auth } from 'shared/firebase';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.authSlice.isLogin);
  console.log('록읜상태', isLogin);
  const [isLoginMode, setIsLoginMode] = useState(true);
  // const [validEmail, setValidEmail] = useState(true);
  const { formState, onChangeHandler, resetForm } = useForm({
    email: '',
    password: '',
    checkpassword: '',
    nickname: '',
    validPasswrod: '',
  });
  const { password, nickname, email, checkpassword } = formState;

  useEffect(() => {
    if (isLogin) navigate('/');
  }, [isLogin]);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    //로그인시
    if (isLoginMode) {
      dispatch(__loginUser({ email, password }));

      //   toast.success('로그인 성공');
    } else {
      //회원가입시
      dispatch(__signupUser({ email, password, nickname }));
      resetForm();
    }
  };
  return (
    <Container>
      <Form onSubmit={onSubmitHandler}>
        <Title>{isLoginMode ? '로그인' : '회원가입'}</Title>
        <InputWrap>
          <Input
            name="email"
            value={email}
            onChange={onChangeHandler}
            placeholder="이메일을 입력해 주세요."
          />
          <Input
            name="password"
            value={password}
            onChange={onChangeHandler}
            placeholder="비밀번호를 입력해 주세요. (6~15글자)"
            minLength={6}
            maxLength={15}
            type="password"
          />
          {!isLoginMode && (
            <>
              <Input
                name="validPasswrod"
                value={checkpassword}
                onChange={onChangeHandler}
                placeholder="비밀번호 확인"
                minLength={6}
                maxLength={15}
                type="password"
              />
              <Input
                name="nickname"
                value={nickname}
                onChange={onChangeHandler}
                placeholder="닉네임을 입력해 주세요. (1~10글자)"
                minLength={1}
                maxLength={10}
              />
            </>
          )}
          <Button
            disabled={
              isLoginMode
                ? !email || !password
                : !email || !password || !nickname
            }
          >
            {isLoginMode ? '로그인' : '회원가입'}
          </Button>
        </InputWrap>
        <ToggleText>
          <span onClick={() => setIsLoginMode((prev) => !prev)}>
            {isLoginMode ? '회원가입' : '로그인'}
          </span>
        </ToggleText>
      </Form>
    </Container>
  );
}

export default Login;
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const Button = styled.button`
  padding: 12px 18px;
  width: 80%;
  ${(props) => {
    if (props.disabled) {
      return css`
        background-color: lightgray;
      `;
    }
    return css`
      background-color: #7a97ff;
      cursor: pointer;
    `;
  }}
`;
const Container = styled.div`
  background-color: #c3ebff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -3rem;
`;
const Form = styled.form`
  background-color: white;
  width: 400px;
  border-radius: 12px;
  padding: 20px;
  font-size: 16px;
`;
const Title = styled.p`
  display: flex;
  justify-content: center;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 20px;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid gray;
  /**input테두리 없애고 밑줄만 */
  display: flex;
  /* justify-content: center; */
  width: 80%;
  display: block;
  margin-bottom: 16px;
  outline: none;
  /**input 클릭시 테두리쳐지는거 삭제 */
  padding: 12px 0;
`;
const ToggleText = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 24px;

  & span {
    color: lightgray;
    user-select: none; /**span이지만 사용자가 드래그 못함 */
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
`;
