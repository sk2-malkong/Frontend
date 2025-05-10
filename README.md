# Purgo Frontend (FrontDev)

> AI 기반 욕설 순화 서비스 **Purgo**의 프론트엔드 코드입니다.

---

## 🚀 주요 기능

- **실시간 욕설 감지 & 순화**  
  - 문자열 내 욕설을 감지해 대체어로 교체  
  - GSAP 기반 강조 애니메이션  

- **부드러운 스크롤 & 섹션 전환**  
  - AOS, GSAP ScrollTrigger 사용  
  - 섹션별 페이드/슬라이드 효과  

- **통계 · 리뷰 · FAQ**  
  - CountUp으로 애니메이션 카운트  
  - FAQ 아코디언 컴포넌트  

- **반응형 디자인**  
  - 모바일 · 태블릿 · 데스크탑 지원  
  - styled-components 기반 테마 관리

---

## 📦 설치 및 실행

### 요구 사항

- Node.js v14 이상 (권장)  
- npm 또는 Yarn

```bash
📝 스크립트
명령어	설명
npm start	개발 서버 실행 (http://localhost:3000)
npm run build	프로덕션 빌드 생성
npm test	테스트 실행
npm run eject	CRA 설정 커스터마이징

Yarn을 사용할 경우 npm 을 yarn 으로 변경하면 동일하게 동작합니다.
# 1. 리포지토리 클론
git clone https://github.com/sk2-malkong/Frontend.git
cd Frontend

# 2. FrontDev 브랜치로 체크아웃
git checkout FrontDev

🛠️ 기술 스택
React + TypeScript

스타일링: styled-components

애니메이션:
GSAP (ScrollTrigger)
AOS
CountUp (카운트 애니메이션)

라우팅: react-router-dom

HTTP 클라이언트: axios

번들러: Create React App (CRA)
# 4. 개발 서버 실행
npm start
# 또는
yarn start

# 브라우저에서 http://localhost:3000 에 접속
