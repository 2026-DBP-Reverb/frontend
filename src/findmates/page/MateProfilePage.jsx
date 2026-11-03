import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { getMateProfile, requestMate } from "../api/mateApi";
import * as S from "../style/StyledFindMates";

export default function MateProfilePage() {
    const { memberId } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function loadProfile() {
            try {
                const mateProfile = await getMateProfile(memberId);
                if (isMounted) {
                    setProfile(mateProfile);
                }
            } catch (error) {
                console.error("메이트 프로필을 불러오지 못했습니다.", error);
            }
        }

        loadProfile();

        return () => {
            isMounted = false;
        };
    }, [memberId]);

    const handleRequest = async () => {
        try {
            await requestMate(memberId)
            setProfile({ ...profile, requestStatus: "SENT" });
        } catch (error) {
            alert(error.message);
        }
    };

    if (!profile) {
        return null;
    }

    // 상태에 따라 버튼 하나 정하기
    let actionButton;
    if (profile.instagramId) {
        actionButton = <button disabled>매칭 완료</button>;
    } else if (profile.requestStatus === "SENT") {
        actionButton = <button disabled>수락 대기 중</button>;
    } else if (profile.requestStatus === "RECEIVED") {
        actionButton = <button disabled>받은 요청 확인</button>;
    } else {
        actionButton = <button onClick={handleRequest}>메이트 신청</button>;
    }

    return (
        <main className="page-layout">
            <div className="page-content">
                <BackButton onClick={() => navigate(-1)} />

                <img src={profile.profileImageUrl} alt="" width="120" />
                <p>{profile.nickname}</p>
                <p>
                    Instagram {profile.instagramId ? `@${profile.instagramId}` : "매칭 후 공개돼요"}
                </p>
                {actionButton}
            </div>
        </main>
    );
}