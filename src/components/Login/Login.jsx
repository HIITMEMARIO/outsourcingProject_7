import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { __login, login } from '../../redux/modules/authSlice';
import useForm from 'Hooks/userForm';
import { authApi } from 'api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { formState, onChangeHandler, resetForm } = useForm({
    id: '',
    password: '',
    nickname: '',
  });
  const { id, password, nickname } = formState;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoginMode) {
      try {
        const { type } = await dispatch(__login({ id, password }));
        if (type === 'getUsers/fulfilled') {
          navigate('/');
        }
      } catch (error) {
        console.log('login', error);
      }

      //   toast.success('로그인 성공');
    } else {
      try {
        await authApi.post('/user', {
          id,
          password,
          nickname,
        });
        setIsLoginMode(true);
        resetForm();
      } catch (error) {
        console.log(error);
      }
      //   setFormState(initailState); //input초기화 //커스텀훅
      //   toast.success('회원가입 성공');
    }
  };
  return (
    <Container>
      <Form onSubmit={onSubmitHandler}>
        <Title>{isLoginMode ? '로그인' : '회원가입'}</Title>
        <InputWrap>
          <Input
            name="id"
            value={id}
            onChange={onChangeHandler}
            placeholder="아이디 (4~10글자)"
            minLength={4}
            maxLength={10}
          />
          <Input
            name="password"
            value={password}
            onChange={onChangeHandler}
            placeholder="비밀번호 (4~15글자)"
            minLength={4}
            maxLength={15}
          />
          {!isLoginMode && ( //로그인모드가 아닐때만!
            <Input
              name="nickname"
              value={nickname}
              onChange={onChangeHandler}
              placeholder="닉네임 (1~10글자)"
              minLength={1}
              maxLength={10}
            />
          )}
          <Button
            disabled={
              isLoginMode ? !id || !password : !id || !password || !nickname
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
