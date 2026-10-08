import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/memberApi';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as S from '../style/StyledSignup';

const DONGDUK_EMAIL_PATTERN = /^20\d{6}@dongduk\.ac\.kr$/i;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export default function SignupPage() {

const [email, setEmail] = useState('');
const [confirmNumber, setConfirmNumber] = useState('');
const [password, setPassword] = useState('');
const [passwordConfirm, setPasswordConfirm] = useState('');
const [isAgreed, setIsAgreed] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);
const [touched, setTouched] = useState({
  email: false,
  password: false,
  passwordConfirm: false,
});

const isEmailValid = DONGDUK_EMAIL_PATTERN.test(email);
const isPasswordValid = PASSWORD_PATTERN.test(password);
const isPasswordConfirmValid =
  passwordConfirm.length > 0 && password === passwordConfirm;
const areFieldsValid =
  isEmailValid &&
  confirmNumber.trim().length > 0 &&
  isPasswordValid &&
  isPasswordConfirmValid;
const canSubmit = areFieldsValid && isAgreed && !isSubmitting;

const navigate = useNavigate();

const handleSignup = async (event) => {
  event.preventDefault();
  setErrorMessage('');

  setTouched({
    email: true,
    password: true,
    passwordConfirm: true,
  });

  if (!areFieldsValid) {
    return;
  }

  if (!isAgreed) {
    setErrorMessage('이용약관에 동의해주세요.');
    return;
  }

  try {
    setIsSubmitting(true);

    const member = await signup({
      email,
      password,
      passwordConfirm,
    });

    console.log('가입된 회원:', member);

    // 응답에 로그인 토큰이 없으므로 우선 로그인 화면으로 이동
    navigate('/');
  } catch (error) {
    setErrorMessage(error.message);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <main className="page-layout">
      <form className="page-content" onSubmit={handleSignup}>
        <S.Title>회원가입</S.Title>
        
        <S.InputField>
          <S.Label htmlFor="email">이메일</S.Label>

          <S.VerificationRow>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={() =>
                setTouched((previous) => ({ ...previous, email: true }))
              }
              placeholder="교내 웹메일을 입력해주세요"
              aria-invalid={touched.email && !isEmailValid}
              aria-describedby="email-error"
            />

            <Button
              type="button"
              style={{
                width: '80px',
                flexShrink: 0,
              }}
            >
              인증
            </Button>
          </S.VerificationRow>
          {touched.email && !isEmailValid && (
            <S.ErrorMessage id="email-error">
              * 20으로 시작하는 8자리 학번의 교내 메일을 입력해주세요
            </S.ErrorMessage>
          )}
        </S.InputField>

        <S.InputField>
           <S.Label>인증번호</S.Label>

           <S.VerificationRow>
            <Input
              id="confirmNumber"
              name="confirmNumber"
              value={confirmNumber}
              onChange={(event) => setConfirmNumber(event.target.value)}
              placeholder="이메일 인증번호를 입력해주세요"
              style={{
                width: '100%',
                flex: 1,
                minWidth: 0,
              }}
            />

            <Button
              type="button"
              style={{
                width: '80px',
                flexShrink: 0,
              }}
            >
              확인
            </Button>
          </S.VerificationRow>

        </S.InputField>

         <S.InputField>
           <S.Label htmlFor="password">비밀번호</S.Label>

           <S.VerificationRow>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onBlur={() =>
                setTouched((previous) => ({ ...previous, password: true }))
              }
              placeholder="8자 이상, 영문자와 숫자를 포함해 입력해주세요"
              aria-invalid={touched.password && !isPasswordValid}
              aria-describedby="password-error"
            />
          </S.VerificationRow>

          {touched.password && !isPasswordValid && (
            <S.ErrorMessage id="password-error">
              * 영문자, 숫자를 포함해 8자리 이상이 되도록 입력해주세요
            </S.ErrorMessage>
          )}

        </S.InputField>
           <S.InputField>
           <S.Label htmlFor="passwordConfirm">비밀번호 확인</S.Label>

           <S.VerificationRow>
            <Input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              value={passwordConfirm}
              onChange={(event) =>
                setPasswordConfirm(event.target.value)
              }
              onBlur={() =>
                setTouched((previous) => ({
                  ...previous,
                  passwordConfirm: true,
                }))
              }
              placeholder="비밀번호를 다시 입력해주세요"
              aria-invalid={
                touched.passwordConfirm && !isPasswordConfirmValid
              }
              aria-describedby="password-confirm-error"
              />
           </S.VerificationRow>
          {touched.passwordConfirm && !isPasswordConfirmValid && (
            <S.ErrorMessage id="password-confirm-error">
              * 비밀번호가 일치하지 않아요
            </S.ErrorMessage>
          )}
        </S.InputField>

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

        {errorMessage && (
          <S.ErrorMessage role="alert">{errorMessage}</S.ErrorMessage>
        )}

        <Button
          type="submit"
          disabled={!canSubmit}
          style={{ marginTop: '50px' }}
        >
          {isSubmitting ? '가입 중...' : '가입하기'}
        </Button>
      </form>
    </main>
  );
}
