import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { __loginUser, __signupUser } from '../../redux/modules/authSlice';
import useForm from 'Hooks/userForm';
import { useNavigate } from 'react-router-dom';
import { auth, db } from 'shared/firebase';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const isLogin = useSelector((state) => state.authSlice.isLogin);
  const [isLoginMode, setIsLoginMode] = useState(false);

  const [canUseEmail, setCanUseEmail] = useState(false);
  const [canUseNickname, setCanUseNickname] = useState(false);

  // const [validEmail, setValidEmail] = useState(true);
  const { formState, onChangeHandler, resetForm } = useForm({
    email: '',
    password: '',
    checkpassword: '',
    nickname: '',
  });
  // validPasswrod: '',
  const { password, nickname, email, checkpassword } = formState;

  const [isSamePassword, setIsSamePassword] = useState(true);
  useEffect(() => {
    if (!!password && !!checkpassword) {
      if (password === checkpassword) setIsSamePassword(true);
      if (password !== checkpassword) setIsSamePassword(false);
    }
  }, [checkpassword, password]);

  //커스텀훅의 email을 가져와서 정규표현식을 통해 검사하고 isValidEmail에 결과를 set
  useEffect(() => {
    const eamilRegex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (email) setIsValidEmail(eamilRegex.test(email));
  }, [email]);

  useEffect(() => {
    if (isLogin) navigate('/');
  }, [isLogin, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    //로그인시
    if (isLoginMode) {
      const res = await dispatch(__loginUser({ email, password }));
      if (res.type === 'getLoginUser/rejected') {
        toast.success(
          `이메일이나 비밀번호가 잘못입력됐습니다. 다시 입력해 주세요.`,
        );
      } else if (res.type === 'getLoginUser/fulfilled') {
        toast.error(`${res.payload.displayName}님, 반갑습니다.`);
      }

      //   toast.success('로그인 성공');
    } else {
      const res = await dispatch(__signupUser({ email, password, nickname }));
      if (res.type === 'getSignupUser/rejected') {
        toast.success('회원가입에 실패하셨습니다. 다시 시도해 주세요.');
      } else if (res.type === 'getSignupUser/fulfilled') {
        toast.error(
          `${res.payload.displayName}님, My아포에 오신걸 환영합니다.`,
        );
      }

      resetForm();
    }
  };
  const onHandleCheckEmail = async () => {
    const emailRef = collection(db, 'userInfo');
    const q = query(emailRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!email) {
      toast.error('이메일을 입력해 주세요.');
    } else if (!isValidEmail) {
      toast.error('올바른 이메일을 입력해 주세요.');
    } else if (querySnapshot.docs.length === 0) {
      setCanUseEmail(true);
      toast.success('사용가능한 이메일 입니다.');
    } else {
      setCanUseEmail(false);

      toast.error('이미 사용중인 이메일 입니다.');
    }
  };
  const onHandleCheckNickname = async () => {
    const emailRef = collection(db, 'userInfo');
    const q = query(emailRef, where('nickname', '==', nickname));
    const querySnapshot = await getDocs(q);
    if (!nickname) {
      toast.error('닉네임을 입력해 주세요.');
    } else if (querySnapshot.docs.length === 0) {
      setCanUseNickname(true);
      toast.success('사용가능한 닉네임 입니다.');
    } else {
      setCanUseNickname(false);

      toast.error('이미 사용중인 닉네임 입니다.');
    }
  };
  const onHandleToggle = () => {
    resetForm();
    setIsLoginMode((prev) => !prev);
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
          {!isValidEmail && <span>유효한 이메일 형식이 아닙니다.</span>}
          {!isLoginMode && (
            <button type="button" onClick={onHandleCheckEmail}>
              중복 확인
            </button>
          )}
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
                name="checkpassword"
                value={checkpassword}
                onChange={onChangeHandler}
                placeholder="비밀번호 확인"
                minLength={6}
                maxLength={15}
                type="password"
              />
              {isSamePassword ? '' : <span>설정하신 비밀번호와 다릅니다.</span>}
              <Input
                name="nickname"
                value={nickname}
                onChange={onChangeHandler}
                placeholder="닉네임을 입력해 주세요. (1~10글자)"
                minLength={1}
                maxLength={10}
              />
              {!isLoginMode && (
                <button type="button" onClick={onHandleCheckNickname}>
                  중복 확인
                </button>
              )}
            </>
          )}
          <Button
            disabled={
              isLoginMode
                ? !email || !isValidEmail || !password
                : !email ||
                  !isValidEmail ||
                  !password ||
                  !nickname ||
                  !checkpassword ||
                  !isSamePassword ||
                  !canUseEmail ||
                  !canUseNickname
            }
          >
            {isLoginMode ? '로그인' : '회원가입'}
          </Button>
        </InputWrap>
        <ToggleText>
          <span onClick={onHandleToggle}>
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
