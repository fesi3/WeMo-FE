## 기술 스택

<p align="center"> 
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/> 
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white"/> 
</p> 
  <p align="center"> 
    <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white"/> 
    <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"/> 
    <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/> 
  </p> 
    <p align="center"> 
      <img src="https://img.shields.io/badge/Framer Motion-0055FF?style=for-the-badge&logo=Framer&logoColor=white"/> 
      <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=GitHubActions&logoColor=white"/> </p>

---
# 페이지 별 기능 및 구현 방식
## **1. 페이지별 렌더링 방식**

각 페이지는 **SEO, 데이터 갱신 빈도, 사용자 맞춤 데이터 여부**를 고려하여 적절한 렌더링 방식을 적용했습니다.

| 페이지 | 렌더링 방식 | 설명 |
| --- | --- | --- |
| 일정 목록 페이지, 
모임 목록 페이지 | **SSR + CSR** | 초기 데이터를 SSR로 가져오고, 이후 필터 및 무한 스크롤은 CSR로 처리 |
| 일정 상세 페이지,
모임 상세 페이지 | **SSR** | 일정별 맞춤 데이터 제공 및 검색 최적화 |
| 모든 리뷰 페이지  | **ISR + CSR** | 리뷰 데이터가 자주 변경되지 않으므로 ISR 적용, 이후 CSR로 추가 로딩 |
| 마이 페이지  | CSR | 로그인된 사용자 정보에 따라 데이터가 달라지므로 CSR 방식 적용 |

🔹 **SSR (서버 사이드 렌더링)**

- **일정/모임 상세 페이지**는 **검색 엔진 최적화(SEO)**가 필요하고, **사용자별 맞춤 데이터**를 제공해야 하므로 SSR 적용

🔹 **SSR + CSR 조합**

- **일정 목록 & 모임 목록 페이지**는 **초기 데이터는 서버에서 로딩(SSR)하고, 이후 필터링 및 무한 스크롤은 CSR로 처리**하여 최적화

🔹 **ISR (Incremental Static Regeneration)**

- **모든 리뷰 페이지**는 **SEO와 데이터 갱신 빈도를 고려하여 ISR + CSR 방식으로 구현**

---

## **2. 인증 및 보안 기능**

### **📌  일반 회원가입 & OAuth 로그인**

- **일반 회원가입 및 로그인 기능 제공**
    - 이메일, 비밀번호를 입력하여 회원가입 가능
    - **입력 값 검증** →  유효성 검사 및 피드백 제공
- **OAuth 로그인 지원 (카카오, 네이버, 구글)**
    - **REST API 방식으로 OAuth 로그인 기능 구현**
    - HOC 패턴을 적용하여 `Input` 컴포넌트 재사용성 향상
    - **쿠키 기반 인증 (`httpOnly` 쿠키 사용)** → `localStorage`보다 보안 강화

---

## **3. 일정 관련 기능**

### **📌 일정 목록 페이지 (메인 페이지)**

**🛠️ 렌더링 방식: SSR + CSR**

- 초기 데이터는 **SSR**을 활용하여 로딩 속도 최적화
- 필터 변경 및 무한 스크롤 시 **CSR 방식으로 동적 데이터 업데이트**

**🔹 주요 기능**

- 일정 목록을 **카테고리별(달램핏, 워케이션)로 분류하여 제공**
- **무한 스크롤 적용** → 사용자가 스크롤할 때 추가 일정 데이터를 자동으로 로드
- **날짜, 카테고리, 지역 필터 제공**

---

### **📌 일정 상세 페이지**

**🛠️ 렌더링 방식: SSR**

- SEO 최적화를 위해 **SSR 적용**
- `getServerSideProps`를 활용하여 **서버에서 초기 데이터를 가져와 렌더링**

**🔹 주요 기능**

- 참여 인원, 일정 세부 정보 제공
- SSR 환경에서 **쿠키 인증 문제 해결** → `context.req.headers.cookie`를 활용하여 인증 정보 포함

---

## **4. 모임 관련 기능**

### **📌 모임 목록 페이지**

**🛠️ 렌더링 방식: SSR + CSR**

- 초기 모임 데이터는 **SSR을 활용하여 로딩 속도 최적화**
- 정렬 및 무한 스크롤은 **CSR 방식으로 동적 데이터 요청**

**🔹 주요 기능**

- 정렬 및 카테고리 필터 제공
- React Query 기반의 무한 스크롤 적용

---

### **📌 모임 상세 페이지**

**🛠️ 렌더링 방식: SSR**

- SEO 및 초기 데이터 로딩 속도를 고려하여 **SSR 적용**
- 참여 인원, 모임 세부 정보 제공

---

### **📌 찜한 모임 페이지**

**🛠️ 렌더링 방식: CSR**

- 로그인한 사용자에 따라 **개별적인 데이터가 다르므로 CSR 방식 적용**

**🔹 주요 기능**

- 사용자가 찜한 모임 목록을 확인 가능
- **무한 스크롤 기능 적용** → 찜한 모임이 많을 경우 자동으로 추가 데이터 로드

---

## **5. 리뷰 기능**

### **📌 모든 리뷰 페이지**

**🛠️ 렌더링 방식: ISR + CSR**

- **ISR(Incremental Static Regeneration) 적용** → 일정/모임 리뷰 데이터를 일정 주기로 정적 생성
- 개별 리뷰 페이지는 CSR 방식으로 최신 데이터를 가져옴

---

## **6. GNB (Global Navigation Bar) 기능**

### **📌 Footer**

- **전역 네비게이션 바(GNB)를 통해 주요 페이지로 이동 가능**
    - **메인 페이지 (`/plans`)**
    - **모든 리뷰 페이지 (`/all-reviews`)**
    - **번개팟 페이지 (`/lightning`)**
    - **모임 찾기 페이지 (`/meetings`)**
    - **마이페이지 (`/user`)**

### **📌 Header (수정필요)**

- **모임, 일정 타이틀 키워드로 검색 가능**

---

## **7. 번개팟 (수정필요)**

---

## **8. 마이페이지 (수정 필요)**

**🛠️ 렌더링 방식: CSR**

- 로그인한 사용자에 따라 동적으로 데이터가 달라지므로 **CSR(Client-Side Rendering) 적용**
- **로그인 여부 확인 후 비로그인 사용자는 로그인 페이지로 리다이렉트**

**🔹 주요 기능**

- **나의 일정, 나의 모임, 찜한 모임, 작성 리뷰 개수 표시**
- 클릭 시 해당 페이지로 이동하여 세부 내용 확인

