import { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import { getRecommendations } from "../api/mateApi";

export default function FindMatesPage() {
    const [mates, setMates] = useState([]);

    useEffect(() => {
        // HomePage의 loadMusicPreference 모양을 따라서
        // getRecommendations()를 불러서 setMates(...)에 넣기
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

    return (
        <main className="page-layout page-layout--with-navigation">
            <div className="page-content">
                <h1>취향 메이트를 탐색해요</h1>
                {mates.map((mate) => (
                    <div key={mate.memberId}>
                        닉네임: {mate.nickname}
                        일치율: {mate.matchRate}%
                    </div>
                ))}

                <NavigationBar />
            </div>
        </main>
    );


}