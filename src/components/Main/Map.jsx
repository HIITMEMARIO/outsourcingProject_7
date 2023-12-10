import React, { useEffect, useRef, useState } from 'react';
import { StInput, StInputBox, StMapContainer } from './style';
import { FcSearch } from 'react-icons/fc';
import './map.css';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { data } from '../../redux/modules/mapSlice';
import { auth } from 'shared/firebase';
import { __getBooking } from '../../redux/modules/bookingSlice';

const { kakao } = window;

export default function Map() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [hospitalData, setHospitalData] = useState([]);
  const [lt, setLatitude] = useState(0);
  const [lg, setLongitude] = useState(0);
  const container = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nickname, setNickname] = useState('');

  const [myBooking, setMyBooking] = useState([]);
  // 1
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setNickname(user.displayName);
    });
  }, []);

  //2
  useEffect(() => {
    const getBookingData = async () => {
      const getBooking = await dispatch(__getBooking(nickname));
      const idFiltered = getBooking.payload.filter((item) => {
        return item.nickname === nickname;
      });
      const myBooking = idFiltered.filter((booking) =>
        hospitalData.some((hospital) => booking.hospital === hospital.id),
      );
      setMyBooking(idFiltered);
    };
    getBookingData();
  }, [nickname]);
  // useEffect내용 적당히 분리하면서 코드 짤것

  // 카카오 맵
  useEffect(() => {
    // ============================== 지도 생성 ====================================
    const options = {
      center: new window.kakao.maps.LatLng(lt, lg),
      level: 4,
      category_group_code: 'HP8',
      useMapBounds: true,
      location: new kakao.maps.LatLng(lt, lg),
      useMapCenter: true,
      radius: 2000,
    };
    const map = new window.kakao.maps.Map(container.current, options);
    // ===========================================================================

    // ============================== 맵 줌 컨트롤 ==================================
    map.setZoomable(false);
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);
    // ===========================================================================

    // ============================= 현재 위치 ==================================
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        setLatitude(lat);
        setLongitude(lon);

        var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      var message = 'geolocation을 사용할수 없어요..';

      displayMarker(locPosition, message);
    }
    // ===========================================================================

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
    // 키워드 검색 완료 시 호출되는 콜백함수 입니다

    function placesSearchCB(data, status, pagination) {
      if (data !== 'ERROR') setHospitalData(data);
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
    // ===========================================================================

    var customOverlays = [];

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      let hospitalname = '';
      let date = '';
      const booking = myBooking.find((booking) => {
        return booking.hospital === place.id;
      });

      if (booking) {
        hospitalname = booking.hospitalName;
        date = booking.date;
      } else if (booking === undefined) {
        hospitalname = place.place_name;
      }

      const content = `<div class ="label"><span class="hospitalname">${hospitalname}</span><span class="date">${date}에 예약되어 있어요!</span><span class="right"></span></div>`;
      const noBookingcontent = `<div class ="label"><span class="left">${hospitalname}</span><span class="center"></span><span class="right"></span></div>`;

      var customOverlay = new kakao.maps.CustomOverlay({
        position: marker.getPosition(),
        content: booking ? content : noBookingcontent,
        yAnchor: 1.4,
      });
      customOverlays.push(customOverlay);
      kakao.maps.event.addListener(marker, 'click', function () {
        if (customOverlay.getMap()) {
          customOverlay.setMap(null); // 열려있으면 닫기
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
        {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen} /> : ''}
      </StMapContainer>
    </>
  );
}
