import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/modules/authSlice';
import { auth } from 'shared/firebase';

export default function TokenRemainingTime() {
  const [remainingMinutes, setRemainingMinutes] = useState(null);
  const [remainingSeconds, setRemainingSeconds] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    let timeReload;

    const expireTime = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          const updateRemainingTime = () => {
            const currentTime = new Date().getTime();
            const tokenExpirationTime = user?.stsTokenManager.expirationTime;
            const remainingTime = tokenExpirationTime - currentTime;
            const minutes = Math.ceil(remainingTime / (60 * 1000));
            const seconds = Math.ceil(remainingTime / 1000) % 60;
            // console.log(minutes, seconds);
            if (!minutes && !seconds) {
              dispatch(logout());
            }
            setRemainingMinutes(minutes);
            setRemainingSeconds(seconds);
          };
          updateRemainingTime();
          timeReload = setInterval(updateRemainingTime, 1000);
        }
      });
    };
    expireTime();
    return () => clearInterval(timeReload);
  }, []);
  return (
    <div>
      로그인 만료시까지{remainingMinutes}분{remainingSeconds}초 남았습니다.
    </div>
  );
}
