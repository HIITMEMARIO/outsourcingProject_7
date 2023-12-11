
# 프로젝트 개요

내 주변 병원을 한번에 모아보고 예약과 리뷰가 가능하다면 매우 편할거 같은 생각에 사이트를 만들게 되었다.

# 구현 사항

- 홈페이지
- [v]  병원 검색
- [v]  병원 리뷰 확인
- [v]  병원 리뷰 작성
- [v]  예약 메모
- [v]  로그인시, 예약한 병원 보여주기
- [v]  우리 동네 병원 찾기

- 로그인 페이지
- [v]  회원가입 기능
- [v]  로그인 기능

- 마이 페이지
- [v]  병원 예약 내역 확인하기
- [v]  나의 리뷰 확인 및 수정, 삭제

# 프로젝트 폴더 구조

📦src
 ┣ 📂api
 ┃ ┗ 📜booking.js
 ┣ 📂assets
 ┃ ┣ 📜mainlogo.png
 ┃ ┗ 📜myappologo.png
 ┣ 📂components
 ┃ ┣ 📂Footer
 ┃ ┃ ┣ 📜Footer.jsx
 ┃ ┃ ┗ 📜style.js
 ┃ ┣ 📂Header
 ┃ ┃ ┣ 📜Header.jsx
 ┃ ┃ ┣ 📜style.js
 ┃ ┃ ┗ 📜TokenRemainingTime.jsx
 ┃ ┣ 📂Login
 ┃ ┃ ┗ 📜Login.jsx
 ┃ ┣ 📂Main
 ┃ ┃ ┣ 📜Main.jsx
 ┃ ┃ ┣ 📜map.css
 ┃ ┃ ┣ 📜Map.jsx
 ┃ ┃ ┣ 📜modal.css
 ┃ ┃ ┣ 📜Modal.jsx
 ┃ ┃ ┣ 📜Review.jsx
 ┃ ┃ ┗ 📜style.js
 ┃ ┗ 📂Mypage
 ┃ ┃ ┣ 📜editBooking.css
 ┃ ┃ ┣ 📜EditBooking.jsx
 ┃ ┃ ┣ 📜MyProfile.jsx
 ┃ ┃ ┣ 📜MyReview.jsx
 ┃ ┃ ┣ 📜MySchedule.jsx
 ┃ ┃ ┗ 📜style.js
 ┣ 📂Hooks
 ┃ ┗ 📜userForm.js
 ┣ 📂Layout
 ┃ ┣ 📜Layout.jsx
 ┃ ┗ 📜styles.js
 ┣ 📂pages
 ┃ ┣ 📜LoginPage.jsx
 ┃ ┣ 📜MainPage.jsx
 ┃ ┗ 📜MyPage.jsx
 ┣ 📂redux
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜configStore.js
 ┃ ┗ 📂modules
 ┃ ┃ ┣ 📜authSlice.js
 ┃ ┃ ┣ 📜bookingSlice.js
 ┃ ┃ ┣ 📜mapSlice.js
 ┃ ┃ ┗ 📜reviewSlice.js
 ┣ 📂shared
 ┃ ┣ 📜firebase.js
 ┃ ┗ 📜Router.js
 ┣ 📂Styles
 ┃ ┗ 📜GlobalStyle.js
 ┣ 📜App.css
 ┣ 📜App.jsx
 ┗ 📜index.js


 # 와이어 프레임 

기존의 병원하면 떠오르는 초록색을 사용했을시 자칫 부담스럽거나 거부감이 들수있다고 판단해 좀 더 가볍고 산뜻한 느낌의 파란계열 색상을 key color로 지정
메인페이지에서 바로 지도가 한눈에 들어오게끔 최상단에 배치
예약한 병원의 마커는 눈에 띌수있도록 다른 이미지의 마커로 대체

 ![image](https://github.com/HIITMEMARIO/outsourcingProject_7/assets/135943045/b537e013-be99-40d7-bd26-ee48c24c035b)
