import React, { useEffect, useRef, useState } from 'react';
import { StInput, StInputBox, StMapContainer } from './style';
import { FcSearch } from 'react-icons/fc';
import './map.css';
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import { data } from '../../redux/modules/mapSlice';
import { auth } from 'shared/firebase';
import { __getBooking } from '../../redux/modules/bookingSlice';
import myappologo from '../../assets/myappologo.png';

let { kakao } = window;

export default function Map() {
  let dispatch = useDispatch();
  const [render, setRender] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [lt, setLatitude] = useState(0);
  const [lg, setLongitude] = useState(0);
  const container = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nickname, setNickname] = useState('');
  const [myBooking, setMyBooking] = useState([]);
  const [dateFormResult, setDateFormResult] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setNickname(user.displayName);
    });
  }, []);

  useEffect(() => {
    let getBookingData = async () => {
      let getBooking = await dispatch(__getBooking(nickname));
      let idFiltered = getBooking.payload.filter((item) => {
        return item.nickname === nickname;
      });
      setMyBooking(idFiltered);
    };
    getBookingData();
  }, [nickname, render]);

  // 카카오 맵
  useEffect(() => {
    // ============================== 지도 생성 ====================================
    let options = {
      center: new window.kakao.maps.LatLng(lt, lg),
      level: 4,
      category_group_code: 'HP8',
      useMapBounds: true,
      location: new kakao.maps.LatLng(lt, lg),
      useMapCenter: true,
      radius: 2000,
    };
    let map = new window.kakao.maps.Map(container.current, options);
    // ============================== 맵 줌 컨트롤 ==================================
    map.setZoomable(false);
    let mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);
    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);
    // ============================= 현재 위치 ==================================
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude,
          lon = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lon);

        let locPosition = new kakao.maps.LatLng(lat, lon),
          message = '<div style="padding:5px;">여기에 계신가요?!</div>';

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
      });
    } else {
      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      var message = 'geolocation을 사용할수 없어요..';

      displayMarker(locPosition, message);
    }
    // =============================== 조건 검색 ============================================

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places(map);
    // 키워드로 장소를 검색합니다
    searchPlaces();
    // 키워드 검색을 요청하는 함수
    function searchPlaces() {
      // 장소검색 객체를 통해 키워드로 장소검색을 요청

      ps.keywordSearch(inputValue, placesSearchCB, options);
    }

    function placesSearchCB(data, status, pagination) {
      if (status === 'ZERO_RESULT') return;
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          displayMarker(data[i]);
        }

        map.setBounds(bounds);
      }
    }

    var customOverlays = [];

    const imageSrc = myappologo;
    const imageSize = new kakao.maps.Size(40, 40);
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
      let hospitalname = '';
      const booking = myBooking.find((booking) => {
        const changeDateform = new Date(booking.date);
        const year = changeDateform.getFullYear();
        const month = changeDateform.getMonth() + 1;
        const day = changeDateform.getDate();

        const changeDateFormresult = `${year}년 ${month}월 ${day}일`;
        setDateFormResult(changeDateFormresult);
        return booking.hospital === place.id;
      });

      if (booking) {
        hospitalname = booking.hospitalName;
      } else if (booking === undefined) {
        hospitalname = place.place_name;
      }

      // 마커를 생성하고 지도에 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: booking ? markerImage : '',
      });

      let content = `<div class ="label"><span class="hospitalname">${hospitalname}</span><span class="date">${dateFormResult}에 예약되어 있어요!</span><span class="right"></span></div>`;
      let noBookingcontent = `<div class ="label"><span class="left">${hospitalname}</span><span class="center"></span><span class="right"></span></div>`;

      var customOverlay = new kakao.maps.CustomOverlay({
        position: marker.getPosition(),
        content: booking ? content : noBookingcontent,
        yAnchor: 1.4,
      });
      customOverlays.push(customOverlay);
      kakao.maps.event.addListener(marker, 'click', function () {
        if (customOverlay.getMap()) {
          customOverlay.setMap(null);
        } else {
          for (var i = 0; i < customOverlays.length; i++) {
            customOverlays[i]?.setMap(null);
          }
          customOverlay.setMap(map);
        }

        setIsModalOpen(true);

        dispatch(data(place));
      });
    }
  }, [inputValue, lt, lg, myBooking, dispatch]);

  return (
    <>
      <StInputBox>
        <FcSearch size={30} />
        <StInput
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          placeholder="원하시는 병원명 혹은 병원 카테고리를 입력해보세요!"
        />
      </StInputBox>

      <StMapContainer ref={container}>
        <div style={{ width: '99%', height: '800px' }}></div>
        {isModalOpen ? (
          <Modal
            setIsModalOpen={setIsModalOpen}
            render={render}
            setRender={setRender}
          />
        ) : (
          ''
        )}
      </StMapContainer>
    </>
  );
}
