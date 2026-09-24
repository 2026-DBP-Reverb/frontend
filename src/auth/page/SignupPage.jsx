import { Title } from "../style/StyledSingup";
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as S from '../style/StyledSingup';
import { useState } from 'react';

export default function SignupPage() {

    const [isAgreed, setIsAgreed] = useState(false);

  return (
    <main className="page-layout">
      <div className="page-content">
        <Title>회원가입</Title>
        
        <S.InputField>
          <S.Label htmlFor="email">이메일</S.Label>

          <S.VerificationRow>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="교내 웹메일을 입력해주세요"
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
              인증
            </Button>
          </S.VerificationRow>
        </S.InputField>

        <S.InputField>
           <S.Label>인증번호</S.Label>

           <S.VerificationRow>
            <Input
              id="confirmNumber"
              name="confirmNumber"
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
           <S.Label>비밀번호</S.Label>

           <S.VerificationRow>
            <Input
              id="Password"
              name="password"
              type="password"
              placeholder="8자 이상, 영문자와 숫자를 포함해 입력해주세요"
              style={{
                width: '100%',
                flex: 1,
                minWidth: 0,
              }}
            />
          </S.VerificationRow>

        </S.InputField>
           <S.InputField>
           <S.Label>비밀번호 확인</S.Label>

           <S.VerificationRow>
            <Input
              id="Password"
              name="password"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              style={{
                width: '100%',
                flex: 1,
                minWidth: 0,
              }}
            />
          </S.VerificationRow>
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

        <Button type="submit" style={{ marginTop: '50px' }}>
          가입하기
        </Button>
      </div>
    </main>
  );
}
