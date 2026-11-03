import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMateProfile } from "../api/mateApi";

export default function MateProfilePage() {
    const { memberId } = useParams();             // /findmates/21 → "21"
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function loadProfile() {
            try {
                const mateProfile = await getMateProfile(memberId)
                if(isMounted)
                    setProfile(mateProfile)
            } catch (error) {
                console.error("메이트 프로필을 불러오지 못했습니다.", error);
            }
        }

        loadProfile();

        return () => {
            isMounted = false;
        };
    }, [memberId]);

    if (!profile) {
        return null;      // 불러오기 전에는 아무것도 안 그림
    }

    return (
        <main className="page-layout">
            <div className="page-content">
                <p>닉네임: {profile.nickname}</p>
                <p>인스타: {profile.instagramId}</p>
                <p>상태: {profile.requestStatus}</p>
            </div>
        </main>
    );
}