# Reverb Frontend

교내에서 음악 메이트를 찾을 수 있는 Reverb 웹앱의 프론트엔드 프로젝트입니다.
모바일 화면을 기준으로 제작하며, 데스크톱에서는 최대 430px 너비의 웹앱 화면으로 표시됩니다.

## 기술 스택

- React 19
- Create React App 5
- React Router DOM 6
- styled-components 6
- React Testing Library

## 실행 방법

### 1. 개발 환경 확인

Node.js와 npm이 설치되어 있어야 합니다.

```bash
node -v
npm -v
```

### 2. 패키지 설치

프로젝트 루트에서 실행합니다.

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm start
```

## 디렉터리 컨벤션

기능별 코드는 `src/{기능명}` 아래에 배치합니다.

- `page/`: URL과 연결되는 페이지 컴포넌트
- `style/`: 해당 기능에서만 사용하는 styled component
- `src/components/`: 두 개 이상의 기능에서 재사용하는 공통 UI
- `src/styles/`: 타이포그래피 등 앱 전체에서 사용하는 디자인 토큰
- `public/images/`: 정적 이미지 파일

특정 페이지에서만 쓰는 UI는 먼저 해당 기능 폴더에 작성합니다. 다른 기능에서도 반복해서 사용하게 되면 `src/components`로 옮깁니다.

## 네이밍 컨벤션

### 파일과 컴포넌트

- React 컴포넌트 파일은 PascalCase와 `.jsx`를 사용합니다.
- 페이지는 `{이름}Page.jsx` 형식을 사용합니다.
- 페이지 스타일 파일은 `Styled{이름}.jsx` 형식을 사용합니다.
- 컴포넌트 함수와 styled component export는 PascalCase를 사용합니다.
- 일반 변수, 함수와 props는 camelCase를 사용합니다.

## 공통 페이지 레이아웃

모든 페이지는 `index.css`에 정의된 공통 클래스를 사용합니다.

```jsx
export default function ExamplePage() {
  return (
    <main className="page-layout">
      <div className="page-content">
        {/* 페이지 내용 */}
      </div>
    </main>
  );
}
```

- `#root`: 최대 430px 너비로 데스크톱 화면 중앙에 배치
- `.page-layout`: 전체 화면 높이, 전역 배경색, 좌우 25px 및 모바일 안전 영역 적용
- `.page-content`: 실제 콘텐츠 최대 너비 340px

전역 배경색은 다음 fallback 값을 사용합니다.

```css
background: var(--White, #fafafa);
```

## 라우팅

라우팅은 `src/App.js`에서 관리합니다.

페이지 이동에는 `useNavigate`를 사용합니다.

새 페이지를 추가하면 페이지 컴포넌트를 만든 뒤 `App.js`의 `Routes`에 등록합니다.

## 코드 작성 규칙

- 들여쓰기는 공백 2칸을 사용합니다.
- JavaScript 문자열은 작은따옴표를 사용합니다.
- 문장 끝에는 세미콜론을 사용합니다.
- JSX 속성이 많으면 한 줄에 하나씩 작성합니다.
- import는 외부 라이브러리, 공통 컴포넌트, 기능 내부 파일 순으로 정리합니다.
- 반복되는 값과 스타일은 공통 컴포넌트 또는 디자인 토큰으로 분리합니다.
- 컴포넌트 하나가 여러 역할을 맡지 않도록 페이지, 공통 UI와 스타일을 구분합니다.
