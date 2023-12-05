import { useDispatch, useSelector } from 'react-redux';
import { checkLoginStatus } from 'redux/modules/User';

export const useLoggedIn = () => {
  const loginState = useSelector(({ userReducer }) => userReducer.user);
  const dispatch = useDispatch();
  const setLoginState = (user) => dispatch(checkLoginStatus(user));

  return { loginState, setLoginState };
};
