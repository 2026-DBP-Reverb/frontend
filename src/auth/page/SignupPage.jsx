import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {confirmEmailVerification, requestEmailVerification, signup} from "../api/memberApi";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as S from "../style/StyledSignup";

const DONGDUK_EMAIL_PATTERN = /^20\d{6}@dongduk\.ac\.kr$/i;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const RESEND_DELAY_MS = 3 * 60 * 1000;
const CODE_TTL_MS = 5 * 60 * 1000;

function formatTime(seconds) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainder = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${remainder}`;
}

export default function SignupPage() {

  const [email, setEmail] = useState("");
  const [delivery, setDelivery] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmedCode, setConfirmedCode] = useState(null);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [deliveryError, setDeliveryError] = useState("");
  const [confirmationError, setConfirmationError] = useState("");
  const [now, setNow] = useState(0);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    passwordConfirm: false,
  });

  const normalizedEmail = email.trim().toLowerCase();
  const isEmailValid = DONGDUK_EMAIL_PATTERN.test(normalizedEmail);
  const hasRequestedCode = delivery?.email === normalizedEmail;
  const resendSeconds = hasRequestedCode
    ? Math.max(0, Math.ceil((delivery.resendAt - now) / 1000))
    : 0;
  const validSeconds = hasRequestedCode
    ? Math.max(0, Math.ceil((delivery.expiresAt - now) / 1000))
    : 0;
  const isBusy = isSendingCode || isConfirming || isSubmitting;
  const isConfirmed =
    hasRequestedCode && validSeconds > 0 && confirmedCode === verificationCode;
  const canConfirm =
    hasRequestedCode && validSeconds > 0 &&
    /^[0-9]{6}$/.test(verificationCode) && !isConfirmed && !isBusy;
  const isPasswordValid = PASSWORD_PATTERN.test(password);
  const isPasswordConfirmValid =
    passwordConfirm.length > 0 && password === passwordConfirm;
  const areFieldsValid =
    isEmailValid && isConfirmed && isPasswordValid && isPasswordConfirmValid;
  const canSubmit = areFieldsValid && isAgreed && !isBusy;

  useEffect(() => {
    if (!delivery) return;

    const timer = window.setInterval(() => {
      const currentTime = Date.now();
      setNow(currentTime);
      if (currentTime >= Math.max(delivery.expiresAt, delivery.resendAt)) {
        window.clearInterval(timer);
      }
    }, 250);

    return () => window.clearInterval(timer);
  }, [delivery]);

  const handleEmailChange = (event) => {
    const nextEmail = event.target.value;
    setEmail(nextEmail);

    if (nextEmail.trim().toLowerCase() !== normalizedEmail) {
      setDelivery(null);
      setVerificationCode("");
      setConfirmedCode(null);
      setDeliveryError("");
      setConfirmationError("");
      setErrorMessage("");
    }
  };

  const handleRequestCode = async () => {
    if (!isEmailValid || isBusy ||
      (hasRequestedCode && Date.now() < delivery.resendAt)) {
      return;
    }

    setIsSendingCode(true);
    setDeliveryError("");
    setConfirmationError("");
    setConfirmedCode(null);
    setVerificationCode("");
    setErrorMessage("");

    const requestedAt = Date.now();
    try {
      await requestEmailVerification(normalizedEmail);
      const receivedAt = Date.now();
      setNow(receivedAt);
      setDelivery({
        email: normalizedEmail,
        resendAt: receivedAt + RESEND_DELAY_MS,
        expiresAt: requestedAt + CODE_TTL_MS,
      });
    } catch (error) {
      setDeliveryError(error.message);
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleCodeChange = (event) => {
    setVerificationCode(event.target.value.replace(/[^0-9]/g, "").slice(0, 6));
    setConfirmedCode(null);
    setConfirmationError("");
    setErrorMessage("");
  };

  const handleConfirmCode = async () => {
    if (!canConfirm || Date.now() >= delivery.expiresAt) return;

    setIsConfirming(true);
    setConfirmationError("");
    try {
      await confirmEmailVerification({email: normalizedEmail, verificationCode});
      setConfirmedCode(verificationCode);
    } catch (error) {
      setConfirmationError(
        error.code === "INVALID_EMAIL_VERIFICATION_CODE"
          ? "* 인증번호가 일치하지 않아요"
          : error.message
      );
    } finally {
      setIsConfirming(false);
    }
  };

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    setTouched({
      email: true,
      password: true,
      passwordConfirm: true,
    });

    if (!areFieldsValid || isBusy || Date.now() >= delivery.expiresAt) {
      return;
    }

    if (!isAgreed) {
      setErrorMessage("이용약관에 동의해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);

      await signup({
        email: normalizedEmail,
        password,
        passwordConfirm,
        verificationCode,
      });

      // 응답에 로그인 토큰이 없으므로 우선 로그인 화면으로 이동
      navigate("/");
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
              onChange={handleEmailChange}
              onBlur={() => setTouched((previous) => ({...previous, email: true}))}
              disabled={isBusy}
              placeholder="교내 웹메일을 입력해주세요"
              aria-invalid={touched.email && !isEmailValid}
              aria-describedby={touched.email && !isEmailValid ? "email-error" : undefined}
            />

            <Button
              type="button"
              onClick={handleRequestCode}
              disabled={!isEmailValid || isBusy || resendSeconds > 0}
              style={{
                width: "80px",
                flexShrink: 0,
                fontSize: "14px",
                fontWeight: "400",
                whiteSpace: "pre-line"
              }}
            >
              {isSendingCode
                ? "요청 중"
                : hasRequestedCode
                  ? `재전송\n${formatTime(resendSeconds)}`
                  : "인증"}
            </Button>
          </S.VerificationRow>

          {touched.email && !isEmailValid && (
            <S.ErrorMessage id="email-error">
              20으로 시작하는 8자리 학번의 교내 메일을 입력해주세요.
            </S.ErrorMessage>
          )}

          {deliveryError && (
            <S.ErrorMessage role="alert">{deliveryError}</S.ErrorMessage>
          )}

          {hasRequestedCode && (
            <S.ValidityTime>
              {validSeconds > 0
                ? `인증번호 유효시간 (${formatTime(validSeconds)})`
                : "인증번호 유효시간이 지났어요."}
            </S.ValidityTime>
          )}
        </S.InputField>

        <S.InputField>
          <S.Label htmlFor="verificationCode">인증번호</S.Label>
          <S.VerificationRow>
            <Input
              id="verificationCode"
              name="verificationCode"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={verificationCode}
              onChange={handleCodeChange}
              disabled={!hasRequestedCode || validSeconds === 0 || isBusy}
              placeholder="이메일 인증번호를 입력해주세요"
              aria-invalid={Boolean(confirmationError)}
              aria-describedby={confirmationError ? "verification-error" : undefined}
              style={{flex: 1, minWidth: 0}}
            />
            <Button
              type="button"
              variant="burgundy"
              disabled={!canConfirm}
              onClick={handleConfirmCode}
              style={{width: "80px", flexShrink: 0, fontSize: "14px", fontWeight: "400"}}
            >
              {isConfirming ? "확인 중" : isConfirmed ? "완료" : "확인"}
            </Button>
          </S.VerificationRow>
          {confirmationError && (
            <S.ErrorMessage id="verification-error" role="alert">
              {confirmationError}
            </S.ErrorMessage>
          )}
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
                setTouched((previous) => ({...previous, password: true}))
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
              isAgreed ? "Check.svg" : "DisabledCheck.svg"
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
          style={{marginTop: "50px"}}
        >
          {isSubmitting ? "가입 중..." : "가입하기"}
        </Button>
      </form>
    </main>
  );
}
