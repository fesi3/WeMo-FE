# 🧩 WeMo - FE

**WeMo**는 직장인들이 공통의 관심사를 중심으로 오프라인 모임을 개설하고 참여할 수 있는 커뮤니티 서비스입니다.  
본 레포지토리는 **WeMo 웹 프론트엔드** 코드와 관련된 내용을 담고 있습니다.

> 🔗 [서비스 배포 링크](https://we-mo.store)

---

## 📁 목차

- [기술 스택](#기술-스택)
- [페이지 별 기능 및 렌더링 전략](#페이지-별-기능-및-렌더링-전략)
- [주요 기능](#주요-기능)
- [프로젝트 일정](#프로젝트-일정)
- [협업 툴 및 방식](#협업-툴-및-방식)
- [기술적 고민 및 선택 이유](#기술적-고민-및-선택-이유)
- [트러블슈팅](#트러블슈팅)

---

## 기술 스택 🛠

<p align="center"> 
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/> 
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/> 
</p> 
  <p align="center"> 
    <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/> 
    <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"/> 
    <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/> 
  </p> 
    <p align="center"> 
      <img src="https://img.shields.io/badge/Framer Motion-0055FF?style=for-the-badge&logo=Framer&logoColor=white"/> 
      <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=GitHubActions&logoColor=white"/> </p>

---

## 페이지 별 기능 및 렌더링 전략 📄

각 페이지는 **SEO, 데이터 갱신 빈도, 사용자 맞춤 데이터 여부**를 고려하여 적절한 렌더링 방식을 적용했습니다.

| 페이지               | 렌더링 방식    | 설명 |
|----------------------|----------------|------|
| 일정/모임 목록       | SSR + CSR      | 초기 리스트는 SSR, 필터 및 스크롤은 CSR |
| 일정/모임 상세       | SSR            | SEO 및 SSR에서 인증 헤더 처리 |
| 마이페이지           | CSR            | 로그인 유저 기준 맞춤 데이터 |
| 모든 리뷰 페이지     | ISR + CSR      | 자주 바뀌지 않으므로 ISR, 이후 CSR로 추가 로딩 |
| 찜한 모임 페이지     | CSR            | 로그인 사용자별로 다른 데이터 |

---

## 주요 기능 💡

### 🧱 공통 UI 및 반응형 대응
- Tailwind CSS의 유틸리티 클래스를 활용한 반응형 레이아웃 구성
- 모바일, 태블릿, 데스크탑 해상도에 따른 UI 최적화
- GNB, 마이페이지 등 주요 뷰는 모바일 전용 인터페이스 별도 설계
- 동일한 UX 유지 위한 크기·정렬·간격 자동 반영
- 일정/모임 카드, 버튼 등은 재사용 가능한 컴포넌트로 제작
<table>
  <tr>
    <td align="center" width="10%">
      <img src="https://github.com/user-attachments/assets/5ca7ae92-43e6-4fb2-a1de-32c455caa3c2" width="60%"/>
      <br/>
      <sub>📱 모바일 화면</sub>
    </td>
    <td align="center" width="30%">
      <img src="https://github.com/user-attachments/assets/cc4bdfd6-8c15-4996-9862-33d30f3597c4" width="60%"/>
      <br/>
      <sub>💻 PC 화면</sub>
    </td>
  </tr>
</table>


### 🔒 인증 기능
- 일반 회원가입 / 로그인 (Form 기반)
- OAuth 로그인 (카카오, 네이버, 구글)
- httpOnly 쿠키 기반 인증
- Input 재사용을 위한 HOC 패턴 적용
<div style="text-align: left;">
  <img src="https://github.com/user-attachments/assets/df5e4178-4337-4322-8a1a-3d27d551d25b" width="45%" alt="로그인 화면"/>
  <img src="https://github.com/user-attachments/assets/1c7dd86e-ec3a-418b-bbd8-70c4dc44e12c" width="45%" alt="회원가입 화면"/>
</div>


### 📅 모임, 일정 기능
- 카테고리, 날짜, 지역 필터 제공
- 정렬 및 필터 기능
- 무한 스크롤 (IntersectionObserver + React Query)
- SSR + CSR 조합으로 렌더링 최적화
<div style="text-align: left;">
  <img src="https://github.com/user-attachments/assets/b60fb18f-ab61-4bff-85be-8f751973e203" width="45%" alt="메인-일정 페이지"/>
  <img src="https://github.com/user-attachments/assets/256d23c3-b26d-4737-a515-d6647d1bcac0" width="45%" alt="모임 검색 페이지"/>
</div>

### 👥 모임, 일정 상세 기능
- 상세 페이지 SSR 처리로 SEO 및 속도 향상
- 참여자 수, 모집 마감 여부, 일정 장소 등 상세 정보 제공
- 참여 신청 / 취소, 후기 작성 기능
<div style="text-align: left;">
  <img src="https://github.com/user-attachments/assets/aea6c410-8b4d-4b40-8f5c-1e1cede9cef8" width="45%" alt="메인-일정 페이지"/>
  <img src="https://github.com/user-attachments/assets/c4cc1c42-fa3a-4123-8a50-8209a4dab00b" width="45%" alt="모임 검색 페이지"/>
</div>

### 🧾 리뷰 기능 (번개팟 추후 수정)
- 전체 리뷰 페이지는 ISR 방식으로 빌드
- 최신 리뷰는 CSR로 추가 불러오기
<div style="text-align: left;">
  <img src="https://github.com/user-attachments/assets/9a2c06d3-e944-4ab9-b216-dfcfbdaf4a6e" width="45%" alt="메인-일정 페이지"/>
  <img src="https://github.com/user-attachments/assets/34e346fa-3671-4ff6-90c1-7fdfe3e4af17" width="45%" alt="모임 검색 페이지"/>
</div>

### 🧍‍♀️ 마이페이지
- 참여 일정, 모임, 찜 목록 확인 가능
- CSR 기반으로 유저 인증 후 데이터 로딩
<div style="text-align: left;">
  <img src="https://github.com/user-attachments/assets/a09eb80d-f736-4fc1-8b01-7d85d2a0d535" width="90%" alt="메인-일정 페이지"/>
</div>

## 프로젝트 일정 🗓

| 기간         | 작업 내용                         |
|--------------|----------------------------------|
| 12/23 ~ 01/06 | 기획 및 서비스 구조 정의          |
| 01/02 ~ 01/20 | 1차 MVP 개발                     |
| 01/24 ~ 01/31 | 2차 기획, UI/UX 피드백 반영      |
| 02/07 ~ 02/12 | 2차 MVP 및 성능 개선             |

---

## 협업 툴 및 방식 🤝

- 문서화: **Notion**
- 실시간 소통: **Discord**
- 형상 관리 및 배포: **GitHub + Vercel**
- CI/CD: **GitHub Actions**

---

## 기술적 고민 및 선택 이유 ⚙️

- **SSR + CSR 조합**: SEO가 필요한 페이지는 SSR, 사용자 개인화 정보는 CSR, 리뷰처럼 정적 데이터는 ISR 적용
- **쿠키 인증 처리**: getServerSideProps 내 `context.req.headers.cookie`로 인증 처리
- **무한 스크롤 최적화**: React Query + IntersectionObserver 조합
- **재사용성 높은 컴포넌트 구조**: HOC 기반으로 form 관련 컴포넌트 재사용

---

## 트러블슈팅 🧯

- SSR 환경에서 인증 쿠키 미포함 → 서버사이드에서 쿠키 헤더 수동 전달로 해결
- 무한 스크롤 중 중복 요청 발생 → 옵저버 타겟 조건 및 debounce 적용으로 해결
- OAuth 로그인 후 리다이렉트 타이밍 이슈 → 상태 저장 후 useEffect 활용하여 안정화

---