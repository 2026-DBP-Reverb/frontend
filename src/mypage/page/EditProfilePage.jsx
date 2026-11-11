import BackButton from "../../components/BackButton";
import {useNavigate} from "react-router-dom";
import * as S from "../style/StyledEditProfile";
import {useEffect, useState} from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {getMyProfile} from "../../auth/api/memberApi";
import {updateMyProfile} from "../api/profileApi";

const MAX_NICKNAME_BYTES = 100;
const MAX_NICKNAME_LENGTH = Math.floor(MAX_NICKNAME_BYTES / 3);
const INVALID_NICKNAME_CHARACTER = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/;

function getNicknameError(nickname, touched) {
  if (INVALID_NICKNAME_CHARACTER.test(nickname)) {
    return "닉네임에는 한글, 영문, 숫자만 사용할 수 있어요.";
  }

  if (touched && nickname.length < 2) {
    return "닉네임을 2자 이상 입력해주세요.";
  }
  if (nickname.length > MAX_NICKNAME_LENGTH) {
    return `닉네임은 ${MAX_NICKNAME_LENGTH}자 이하로 입력해주세요.`;
  }
  if (new TextEncoder().encode(nickname).length > MAX_NICKNAME_BYTES) {
    return `닉네임은 UTF-8 기준 ${MAX_NICKNAME_BYTES}바이트 이하로 입력해주세요.`;
  }
  return "";
}

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameTouched, setNicknameTouched] = useState(false);
  const [instagramId, setInstagramId] = useState("");
  const [instagramIdError, setInstagramIdError] = useState("");
  const [profile, setProfile] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const nicknameError = getNicknameError(nickname, nicknameTouched);
  const canSubmit = Boolean(profile) && !isSaving &&
    getNicknameError(nickname, true) === "" &&
    (instagramId === "" || instagramIdError === "");

  useEffect(() => {
    let active = true;

    getMyProfile().then((member) => {
      if (!active) return;
      if (!member) throw new Error("내 프로필 정보를 불러오지 못했습니다.");

      setNickname(member.nickname ?? "");
      setInstagramId(member.instagramId ?? "");
      setImageUrl(member.profileImageUrl ?? "");
      setProfile(member);
    }).catch((error) => {
      if (active) setLoadError(error.message);
    });

    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    setIsSaving(true);
    setSaveError("");
    try {
      await updateMyProfile({
        nickname,
        instagramId,
        profileImageUrl: imageUrl && imageUrl !== profile.profileImageUrl ? imageUrl : null,
      });
      navigate("/mypage", {replace: true});
    } catch (error) {
      setSaveError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInstagramIdChange = (event) => {
    const input = event.target.value;
    const allowedInput = input.replace(/[^a-zA-Z0-9_.]/g, "");
    setInstagramId(allowedInput);

    if (input !== allowedInput) {
      setInstagramIdError("영문, 숫자, 밑줄(_)과 마침표(.)만 입력할 수 있어요.");
    } else if (allowedInput.length > 30) {
      setInstagramIdError("인스타그램 아이디는 30자까지 입력할 수 있어요.");
    } else if (allowedInput.startsWith(".") || allowedInput.endsWith(".") || allowedInput.includes("..")) {
      setInstagramIdError("마침표(.)는 처음이나 끝에 쓰거나 연속으로 쓸 수 없어요.");
    } else {
      setInstagramIdError("");
    }
  };

  const handleImageUrlChange = () => {
    const input = window.prompt("이미지 URL을 입력해주세요.", imageUrl);

    if (input === null) {
      return;
    }

    const nextImageUrl = input.trim();

    if (!nextImageUrl) {
      setImageUrl("");
      return;
    }

    try {
      const parsedUrl = new URL(nextImageUrl);

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error("지원하지 않는 URL 형식입니다.");
      }

      setImageUrl(nextImageUrl);
    } catch {
      window.alert("http 또는 https로 시작하는 이미지 URL을 입력해주세요.");
    }
  };

  return (
    <main className="page-layout">
      <div className="page-content">
        <div style={{paddingTop: "60px"}}/>
        <BackButton onClick={() => navigate(-1)}/>

        <S.Form onSubmit={handleSubmit}>
          <S.ImageUploadSection
            type="button"
            aria-label="프로필 사진 URL 입력"
            disabled={!profile || isSaving}
            onClick={handleImageUrlChange}
          >
            <S.UploadIcon type="button" aria-label="프로필 사진 업로드">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
                <path
                  d="M5 14H15C15.2 14 15.35 13.9083 15.45 13.725C15.55 13.5417 15.5333 13.3667 15.4 13.2L12.65 9.525C12.55 9.39167 12.4167 9.325 12.25 9.325C12.0833 9.325 11.95 9.39167 11.85 9.525L9.25 13L7.4 10.525C7.3 10.3917 7.16667 10.325 7 10.325C6.83333 10.325 6.7 10.3917 6.6 10.525L4.6 13.2C4.46667 13.3667 4.45 13.5417 4.55 13.725C4.65 13.9083 4.8 14 5 14ZM2 18C1.45 18 0.979333 17.8043 0.588 17.413C0.196 17.021 0 16.55 0 16V4C0 3.45 0.196 2.97933 0.588 2.588C0.979333 2.196 1.45 2 2 2H5.15L6.4 0.65C6.58333 0.433333 6.804 0.270667 7.062 0.162C7.32067 0.0539999 7.59167 0 7.875 0H12.125C12.4083 0 12.6793 0.0539999 12.938 0.162C13.196 0.270667 13.4167 0.433333 13.6 0.65L14.85 2H18C18.55 2 19.021 2.196 19.413 2.588C19.8043 2.97933 20 3.45 20 4V16C20 16.55 19.8043 17.021 19.413 17.413C19.021 17.8043 18.55 18 18 18H2Z"
                  fill="#FAFAFA"/>
              </svg>
            </S.UploadIcon>
            {imageUrl ? (
              <S.ProfileImage
                src={imageUrl}
                alt="프로필 사진"
                onError={() => setImageUrl("")}
              />
            ) : (
              <S.ProfileImage src={`${process.env.PUBLIC_URL}/images/Profile1.svg`} alt="기본 프로필 이미지"/>
            )}
          </S.ImageUploadSection>

          <S.InputList>
            <S.InputItem>
              <S.InputLabel htmlFor="email">학교 이메일</S.InputLabel>
              <Input
                id="email"
                name="email"
                type="email"
                value={profile?.email ?? ""}
                disabled
                style={{
                  backgroundColor: "#B8C0C033",
                  color: "var(--Gray, #BDBDBD)",
                  WebkitTextFillColor: "var(--Gray, #BDBDBD)",
                  opacity: 1,
                }}
              />
            </S.InputItem>

            <S.InputItem>
              <S.InputLabel htmlFor="nickname">닉네임</S.InputLabel>
              <Input
                id="nickname"
                name="nickname"
                type="text"
                value={nickname}
                disabled={!profile || isSaving}
                placeholder={`닉네임을 입력해주세요 (2~${MAX_NICKNAME_LENGTH}자)`}
                onChange={(event) => setNickname(event.target.value)}
                onBlur={() => setNicknameTouched(true)}
                aria-invalid={Boolean(nicknameError)}
                aria-describedby={nicknameError ? "nickname-error" : undefined}
              />
              {nicknameError && (
                <S.ErrorMessage id="nickname-error" role="alert">
                  {nicknameError}
                </S.ErrorMessage>
              )}
            </S.InputItem>

            <S.InputItem>
              <S.InputLabel htmlFor="instagramId">인스타그램 아이디</S.InputLabel>
              <Input
                id="instagramId"
                name="instagramId"
                type="text"
                value={instagramId}
                disabled={!profile || isSaving}
                placeholder="인스타그램 아이디를 입력해주세요"
                onChange={handleInstagramIdChange}
                aria-invalid={Boolean(instagramIdError)}
                aria-describedby={instagramIdError ? "instagram-id-error" : undefined}
              />
              {instagramIdError && (
                <S.ErrorMessage id="instagram-id-error" role="alert">
                  {instagramIdError}
                </S.ErrorMessage>
              )}
            </S.InputItem>
          </S.InputList>

          {(loadError || saveError) && (
            <S.ErrorMessage role="alert">{loadError || saveError}</S.ErrorMessage>
          )}
          <Button
            type="submit"
            disabled={!canSubmit}
          >
            {isSaving ? "저장 중" : "저장하기"}
          </Button>
        </S.Form>
      </div>
    </main>
  );
}
