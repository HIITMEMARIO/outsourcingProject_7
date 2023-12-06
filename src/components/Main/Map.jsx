import React, { useEffect, useRef, useState } from 'react';
import { StInput, StInputBox, StMapContainer } from './style';
import { FcSearch } from 'react-icons/fc';
const { kakao } = window;

export default function Map() {
  const [inputValue, setInputValue] = useState('');
  const [hospitalData, setHospitalData] = useState([]);
  const container = useRef(null);
  console.log('asdfafds', hospitalData);

  useEffect(() => {
    // ==============================지도 생성====================================
    const options = {
      center: new window.kakao.maps.LatLng(37.555167, 126.970833),
      level: 4,
      category_group_code: 'HP8',
      useMapBounds: true,
      location: new kakao.maps.LatLng(37.566535, 126.9779692),
      useMapCenter: true,
      radius: 500,
    };
    const map = new window.kakao.maps.Map(container.current, options);
    // ===========================================================================
    // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places(map);
    console.log(ps);

    // 키워드로 장소를 검색합니다
    searchPlaces();

    // 키워드 검색을 요청하는 함수
    function searchPlaces() {
      // 장소검색 객체를 통해 키워드로 장소검색을 요청

      ps.keywordSearch(inputValue, placesSearchCB, options);
    }
    // 키워드 검색 완료 시 호출되는 콜백함수 입니다

    function placesSearchCB(data, status, pagination) {
      console.log(data);
      setHospitalData(data);
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          displayMarker(data[i]);
        }

        map.setBounds(bounds);
      }
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style= "height:100px"; "padding:5px;font-size:12px;">' +
            place.place_name +
            '</div>',
        );
        infowindow.open(map, marker);
      });
    }
  }, [inputValue]);

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
          placeholder="병원명 혹은 병원 카테고리를 입력해보세요!"
        />
      </StInputBox>
      <StMapContainer ref={container}>
        <div style={{ width: '99%', height: '500px' }}></div>
      </StMapContainer>
    </>
  );
}
