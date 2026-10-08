import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/memberApi';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as L from '../style/StyledLogin';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const canSubmit =
    email.trim().length > 0 && password.length > 0 && !isSubmitting;

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      setIsSubmitting(true);
      await login({ email, password });
      navigate('/home');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-layout">
      <form className="page-content" onSubmit={handleLogin}>
        <L.Logo
          src={`${process.env.PUBLIC_URL}/images/Logo.svg`}
          alt="Reverb 로고"
        />

        <L.LogoText>
          <L.SchoolText>우리 학교에서 찾는 </L.SchoolText> 음악 메이트
        </L.LogoText>

        <Input
          id="loginEmail"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="교내 웹메일을 입력해주세요"
          autoComplete="email"
          style={{ marginTop: '150px' }}
        />

        <Input
          id="loginPassword"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="비밀번호를 입력해주세요"
          autoComplete="current-password"
          style={{ marginTop: '10px' }}
        />

        {errorMessage && (
          <L.ErrorMessage role="alert">{errorMessage}</L.ErrorMessage>
        )}

        <Button
          type="submit"
          disabled={!canSubmit}
          style={{ marginTop: '50px' }}
        >
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>

        <Button
          variant="white"
          type="button"
          style={{ marginTop: '10px' }}
          onClick={() => navigate('/signup')}
        >
          회원가입
        </Button>
      </form>
    </main>
  );
}
