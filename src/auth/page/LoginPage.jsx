import { useNavigate } from 'react-router-dom';
import * as L from '../style/StyledLogin';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <main className="page-layout">
      <div className="page-content">
        <L.Logo
          src={`${process.env.PUBLIC_URL}/images/Logo.svg`}
          alt="Reverb 로고"
        />

        <L.LogoText>
          <L.SchoolText>우리 학교에서 찾는 </L.SchoolText> 음악 메이트
        </L.LogoText>

        <Input
          type="email"
          placeholder="교내 웹메일을 입력해주세요"
          style={{ marginTop: '150px' }}
        />

        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          style={{ marginTop: '10px' }}
        />

        <Button type="submit" style={{ marginTop: '50px' }}>
          로그인
        </Button>

        <Button
          variant="white"
          type="button"
          style={{ marginTop: '10px' }}
          onClick={() => navigate('/signup')}
        >
          회원가입
        </Button>
      </div>
    </main>
  );
}
