# Product Store

DummyJSON API를 활용한 React 기반 상품 목록 및 상세 페이지 구현

## 개발 환경

### 기술 스택

- **Frontend Framework**: React
- **Routing**: React Router DOM
- **HTTP Client**: Fetch API
- **CSS**: Vanilla CSS
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Package Manager**: npm
- **Deployment**: GitHub Pages (gh-pages 6.3.0)

### 외부 API

- **DummyJSON API**: https://dummyjson.com
  - Products 데이터 제공
  - REST API 엔드포인트 활용
  - 페이지네이션 지원

## 개발 내용

### 1. 프로젝트 구조

src/
├── components/
│ ├── common/
│ │ ├── Layout.js/css # 공통 레이아웃
│ │ └── LoadingSpinner.js/css # 로딩 컴포넌트
│ └── product/
│ └── ProductCard.js/css # 상품 카드 컴포넌트
├── pages/
│ ├── ProductList/
│ │ └── ProductList.js/css # 상품 목록 페이지
│ └── ProductDetail/
│ └── ProductDetail.js/css # 상품 상세 페이지
├── hooks/
│ └── useInfiniteScroll.js # 무한 스크롤 훅
├── services/
│ └── productService.js # API 서비스 레이어
└── utils/
└── constants.js # 상수 정의

### 2. 주요 구현 기능

#### 📱 상품 목록 페이지 (ProductList)

- **무한 스크롤**: 사용자가 페이지 하단 근처(1000px)에 도달하면 자동으로 다음 상품 로드
- **페이지네이션**: 한 번에 20개씩 상품 로드
- **로딩 상태 관리**:
  - 초기 로딩 스피너
  - 무한 스크롤 중 스켈레톤 카드
  - 하단 로딩 인디케이터
- **반응형 그리드**: CSS Grid로 다양한 화면 크기 지원

#### 🔍 상품 상세 페이지 (ProductDetail)

- **동적 라우팅**: `/product/:id` 경로로 상품 ID 기반 상세 정보 표시
- **상품 정보 표시**: 제목, 가격, 할인율, 설명, 평점, 재고 상태
- **이미지 갤러리**: 추가 상품 이미지들을 그리드 형태로 표시
- **네비게이션**: 뒤로가기 버튼으로 목록으로 복귀

#### 🧩 재사용 가능한 컴포넌트

**ProductCard 컴포넌트**

- **Variant 시스템**: `list`(목록용), `detail`(상세용) 두 가지 모드
- **가격 포매팅**: Intl.NumberFormat으로 USD 통화 표시
- **이미지 최적화**: lazy loading 및 fallback 이미지
- **인터랙티브 효과**: 호버 시 카드 리프트 및 이미지 확대

**LoadingSpinner 컴포넌트**

- **다양한 로딩 타입**: 스피너, 텍스트, 스켈레톤
- **크기 조절**: small, medium, large

### 3. 상태 관리 및 성능 최적화

#### 무한 스크롤 최적화

- **useInfiniteScroll** 커스텀 훅으로 스크롤 이벤트 관리
- **Race condition 방지**: useRef로 로딩 상태 추적
- **메모리 누수 방지**: 이벤트 리스너 정리
- **스크롤 임계값**: 1000px 여유분으로 사용자 경험 개선

#### 성능 최적화 기법

- **useCallback**: 불필요한 리렌더링 방지
- **Lazy Loading**: 이미지 지연 로드
- **Error Boundaries**: 이미지 로드 실패 시 graceful fallback

### 4. 에러 핸들링 및 사용자 경험

#### 포괄적 에러 처리

- **API 에러**: HTTP 상태 코드 기반 에러 메시지
- **이미지 로드 실패**: 플레이스홀더 이미지 표시

#### 사용자 피드백

- **로딩 스켈레톤**: 콘텐츠 로드 중 레이아웃 유지
- **진행 상황 표시**: 로딩 텍스트 및 애니메이션
- **성공/완료 메시지**: 모든 상품 로드 완료 시 축하 메시지

## 빌드 및 실행 방법

### 로컬 개발 환경

의존성 설치
npm install

개발 서버 실행 (http://localhost:3000)
npm start

프로덕션 빌드
npm run build

GitHub Pages 배포
npm run deploy

### 개발 서버 접속

- **Local**: http://localhost:3000

## 배포한 정적 사이트 URL

**🔗 Live Demo**: [https://12parkhy.github.io/alt_assignment/](https://12parkhy.github.io/alt_assignment/)

## Github Repository URL

**📁 Repository**: [https://github.com/12parkhy/alt_assignment](https://github.com/12parkhy/alt_assignment)

---
