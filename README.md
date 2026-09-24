# Reverb Frontend

교내에서 음악 메이트를 찾을 수 있는 Reverb 웹앱의 프론트엔드 프로젝트입니다. 모바일 화면을 기준으로 제작하며, 데스크톱에서는 최대 430px 너비의 웹앱 화면으로 표시됩니다.

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

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열면 앱을 확인할 수 있습니다. 개발 서버 실행 중 코드를 저장하면 화면이 자동으로 갱신됩니다.

Chrome으로 자동 실행하려면 프로젝트 루트에 Git으로 관리하지 않는 `.env.local` 파일을 만들고 다음 값을 작성합니다.

```env
BROWSER=chrome
```

## 주요 명령어

| 명령어 | 설명 |
| --- | --- |
| `npm start` | 개발 서버를 실행합니다. |
| `npm test` | 테스트를 watch 모드로 실행합니다. |
| `npm test -- --watchAll=false` | 테스트를 한 번 실행하고 종료합니다. |
| `npm run build` | 배포용 정적 파일을 `build/`에 생성합니다. |

`npm run eject`는 CRA 내부 설정을 프로젝트로 꺼내는 되돌릴 수 없는 명령이므로 팀 협의 없이 실행하지 않습니다.

## 디렉터리 구조

```text
frontend/
├─ public/
│  └─ images/                 # URL로 직접 접근하는 이미지
│     ├─ BlackLogo.svg
│     ├─ Check.svg
│     ├─ DisabledCheck.svg
│     └─ Logo.svg
├─ src/
│  ├─ auth/                   # 로그인 및 회원가입 기능
│  │  ├─ page/
│  │  │  ├─ LoginPage.jsx
│  │  │  └─ SignupPage.jsx
│  │  └─ style/
│  │     ├─ StyledLogin.jsx
│  │     └─ StyledSignup.jsx
│  ├─ components/             # 여러 기능에서 사용하는 공통 컴포넌트
│  │  ├─ Button.jsx
│  │  └─ Input.jsx
│  ├─ styles/                 # 디자인 시스템과 공통 스타일 토큰
│  │  └─ typography.js
│  ├─ App.js                  # 최상위 라우팅
│  ├─ App.test.js
│  ├─ index.css               # 전역 스타일과 공통 페이지 레이아웃
│  └─ index.js                # React 진입점
├─ package.json
└─ README.md
```

## 디렉터리 컨벤션

기능별 코드는 `src/{기능명}` 아래에 배치합니다. 현재 인증 기능은 `src/auth`에서 관리합니다.

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
- boolean 상태는 `is`, `has`, `can`처럼 상태를 드러내는 접두사를 사용합니다.

```text
LoginPage.jsx
SignupPage.jsx
StyledLogin.jsx
StyledSignup.jsx
```

```jsx
const [isAgreed, setIsAgreed] = useState(false);
```

파일명과 import 경로의 대소문자 및 철자를 정확히 일치시킵니다. Windows에서는 동작하더라도 대소문자를 구분하는 배포 환경에서는 오류가 날 수 있습니다.

### styled-components

페이지 스타일은 namespace import를 사용합니다.

```jsx
import * as S from '../style/StyledSignup';

<S.Title>회원가입</S.Title>
```

같은 스타일 파일을 named import와 namespace import로 중복해서 가져오지 않습니다. 반복되는 스타일은 styled component로 만들고, 한 번만 사용하는 간단한 간격은 `style` prop으로 전달할 수 있습니다.

```jsx
<Button style={{ marginTop: '10px' }}>회원가입</Button>
```

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

| 경로 | 페이지 |
| --- | --- |
| `/` | `LoginPage` |
| `/signup` | `SignupPage` |

페이지 이동에는 `useNavigate`를 사용합니다.

```jsx
const navigate = useNavigate();

<Button type="button" onClick={() => navigate('/signup')}>
  회원가입
</Button>
```

새 페이지를 추가하면 페이지 컴포넌트를 만든 뒤 `App.js`의 `Routes`에 등록합니다.

## 공통 컴포넌트

### Input

`src/components/Input.jsx`에서 관리합니다. 기본 크기는 `340px × 55px`이며, 일반 HTML input 속성을 그대로 전달할 수 있습니다. placeholder에는 디자인 시스템의 `text1`이 적용됩니다.

```jsx
<Input
  id="email"
  name="email"
  type="email"
  placeholder="교내 웹메일을 입력해주세요"
  autoComplete="email"
/>
```

가로 배치에서 남은 영역을 채우려면 `style` prop으로 크기를 덮어씁니다.

```jsx
<Input
  placeholder="교내 웹메일을 입력해주세요"
  style={{ width: '100%', flex: 1, minWidth: 0 }}
/>
```

### Button

`src/components/Button.jsx`에서 관리합니다. 모든 버튼 글자에는 디자인 시스템의 `text2Bold`가 적용됩니다.

| prop | 기본값 | 설명 |
| --- | --- | --- |
| `variant` | `burgundy` | `burgundy`, `white` 중 버튼 색상을 선택합니다. |
| `type` | `button` | HTML button type입니다. 폼 제출 버튼은 `submit`을 명시합니다. |
| `disabled` | `false` | 비활성화 상태와 투명도, 커서를 적용합니다. |
| `style` | 없음 | 너비나 간격 등 일회성 스타일을 덮어씁니다. |

```jsx
<Button type="submit">로그인</Button>
<Button variant="white">회원가입</Button>
<Button disabled>인증</Button>
```

폼 안에서 제출 목적이 아닌 버튼은 의도치 않은 제출을 막기 위해 `type="button"`을 명시합니다.

## 디자인 시스템

타이포그래피 토큰은 `src/styles/typography.js`에서 관리하고 styled component에서 재사용합니다.

| 토큰 | 크기 | 굵기 | 용도 |
| --- | ---: | ---: | --- |
| `title1` | 32px | 700 | 페이지 제목 |
| `text2Bold` | 16px | 700 | 버튼 및 강조 문구 |
| `text1` | 14px | 400 | 입력 안내와 일반 본문 |
| `labelText` | 12px | 400 | 보조 라벨 |

```jsx
import styled from 'styled-components';
import { title1, text1 } from '../../styles/typography';

export const Title = styled.h1`
  ${title1}
`;

export const Label = styled.label`
  ${text1}
`;
```

색상은 CSS 변수와 fallback 값을 함께 작성합니다.

```css
color: var(--Black, #17171b);
background: var(--DWU-Burgundy, #782c43);
border-color: var(--Gray, #b8c0c0);
```

현재 `Noto Sans KR` 스타일은 정의되어 있지만 웹폰트 파일은 별도로 불러오지 않습니다. 모든 환경에서 동일한 글꼴이 필요하면 전역 웹폰트 설정을 추가해야 합니다.

## 이미지 사용

`public/images`의 파일은 import 없이 `PUBLIC_URL`을 사용합니다.

```jsx
<img
  src={`${process.env.PUBLIC_URL}/images/Logo.svg`}
  alt="Reverb 로고"
/>
```

파일명의 대소문자를 실제 파일과 동일하게 작성합니다. 의미를 전달하는 이미지는 구체적인 `alt`를 작성하고, 텍스트 옆에서 상태만 표현하는 장식 이미지는 `alt=""`를 사용합니다.

## 상태와 접근성

- 입력 라벨의 `htmlFor`와 input의 `id`를 동일하게 작성합니다.
- 클릭 가능한 요소는 `div` 대신 `button`을 사용합니다.
- 체크 UI를 button으로 구현할 때는 `role="checkbox"`와 `aria-checked`를 제공합니다.
- 이미지 버튼에는 텍스트 또는 접근 가능한 이름을 제공합니다.

```jsx
<S.AgreementButton
  type="button"
  role="checkbox"
  aria-checked={isAgreed}
  onClick={() => setIsAgreed((previous) => !previous)}
>
  <S.Check
    src={`${process.env.PUBLIC_URL}/images/${
      isAgreed ? 'Check.svg' : 'DisabledCheck.svg'
    }`}
    alt=""
  />
  <S.AgreementText>
    (필수) 이용약관 및 개인정보 수집·이용 동의
  </S.AgreementText>
</S.AgreementButton>
```

## 코드 작성 규칙

- 들여쓰기는 공백 2칸을 사용합니다.
- JavaScript 문자열은 작은따옴표를 사용합니다.
- 문장 끝에는 세미콜론을 사용합니다.
- JSX 속성이 많으면 한 줄에 하나씩 작성합니다.
- import는 외부 라이브러리, 공통 컴포넌트, 기능 내부 파일 순으로 정리합니다.
- 반복되는 값과 스타일은 공통 컴포넌트 또는 디자인 토큰으로 분리합니다.
- 컴포넌트 하나가 여러 역할을 맡지 않도록 페이지, 공통 UI와 스타일을 구분합니다.

## 테스트와 빌드 확인

기능을 수정한 뒤 관련 테스트와 배포 빌드를 확인합니다.

```bash
npm test -- --watchAll=false
npm run build
```

현재 `App.test.js`는 로그인 페이지에서 회원가입 버튼을 눌렀을 때 회원가입 페이지로 이동하는 동작을 검사합니다.
