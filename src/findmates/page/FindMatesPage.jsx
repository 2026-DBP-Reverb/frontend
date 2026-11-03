import { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import { getMateProfile, getRecommendations, requestMate } from "../api/mateApi";
import { useNavigate } from "react-router-dom";

export default function FindMatesPage() {
    const [mates, setMates] = useState([]);
    const [index, setIndex] = useState(0);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        async function findmates(){
            try{
                const recommendations = await getRecommendations();
                if(isMounted) {
                    setMates(recommendations);
                }
            } catch(error) {
                console.error('메이트 추천 정보를 불러오지 못했습니다.', error);
            }
        }

        findmates();

        return () => {
            isMounted = false;
        };
    }, []);

    const currentMate = mates[index];
    useEffect(() => {
        if (!currentMate) {
            return;              // 아직 사람이 없으면 아무것도 안 함
        }

        let isMounted = true;

        async function loadProfile() {
            try{
                const data = await getMateProfile(currentMate.memberId);
                if (isMounted) {
                    setProfile(data);
                }
            } catch(error) {
                console.error('메이트 프로필을 불러오지 못했습니다.', error);
            }
        }

        loadProfile();

        return () => {
            isMounted = false;
        };
    }, [currentMate?.memberId]);
    const showPrev = () => {setIndex((index - 1 + mates.length) % mates.length)};
    const showNext = () => {setIndex((index + 1) % mates.length)};
    const handleRequest = async () => {
        try {
            await requestMate(currentMate.memberId);
            // 성공하면 → 화면의 버튼을 [수락 대기 중]으로 바꾸기
            setMates(mates.map((mate) =>
                mate.memberId === currentMate.memberId
                    ? { ...mate, requestStatus: "SENT" }    // 이 사람만 SENT로 바꾼 복사본
                    : mate                                   // 나머지는 그대로
            ));
        } catch (error) {
            alert(error.message);           // 예: "이미 메이트 신청을 보냈습니다."
        }
    };
    return (
        <main className="page-layout page-layout--with-navigation">
            <div className="page-content">
                <h1>취향 메이트를 탐색해요</h1>
                {currentMate ? (
                    <>
                        <button onClick={showPrev}>{"<"}</button>
                        <div>
                            닉네임:{currentMate.nickname}
                            일치율:{currentMate.matchRate}
                        </div>
                        {profile?.tracks.slice(0, 5).map((track) => (
                            <div key={track.spotifyTrackId}>
                                곡제목: {track.trackName}
                                아티스트: {track.artistName}
                            </div>
                        ))}
                        <button onClick={showNext}>{">"}</button>
                        <button onClick={() => navigate(`/findmates/${currentMate.memberId}`)}>취향 보기</button>
                        {currentMate.requestStatus === "SENT" ? (
                            <button disabled>수락 대기 중</button>
                        ) : (
                            <button onClick={handleRequest}>메이트 신청</button>
                        )}
                    </>
                ) : (
                    <p>추천할 메이트가 없어요</p>
                )}
                <NavigationBar />
            </div>
        </main>
    );
}