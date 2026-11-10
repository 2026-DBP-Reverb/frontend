import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { acceptRequest, getMyMates, rejectRequest } from "../api/mateApi";
import * as S from "../style/StyledMyMates";

export default function MyMatesPage() {
    const navigate = useNavigate();
    const [mates, setMates] = useState([]);

    // 목록 불러오기 (수락/거절 후에도 다시 부를 거라 밖으로 뺌)
    const loadMates = async () => {
        try {
            const data = await getMyMates();
            setMates(data);
        } catch (error) {
            console.error("나의 메이트 목록을 불러오지 못했습니다.", error);
        }
    };

    useEffect(() => {
        loadMates();
    }, []);

    const handleAccept = async (requestId) => {
        try {
            await acceptRequest(requestId);    // 수락이 끝날 때까지 기다리고
            await loadMates();                 // 그다음 목록 새로고침
        } catch (error) {
            alert(error.message);
        }
    };

    const handleReject = async (requestId) => {
        try{
            await rejectRequest(requestId);
            await loadMates();
        } catch (error) {
            alert(error.message);
        }
    };

    const openInstagram = (instagramId) => {
        if (!instagramId) {
            alert("인스타 아이디가 없어요");
            return;
        }
        window.open(`https://www.instagram.com/${instagramId}`, "_blank");
    };

    return (
        <main className="page-layout">
            <div className="page-content">
                <S.Container>
                    <BackButton onClick={() => navigate(-1)} />
                    <div>
                        <S.Title>나의 메이트 목록</S.Title>
                        <S.List>
                            {mates.length === 0 && <S.EmptyText>아직 메이트가 없어요</S.EmptyText>}

                            {mates.map((mate) => (
                                <S.Row key={`${mate.status}-${mate.requestId}`}>
                                    <S.Avatar src={mate.profileImageUrl} alt="" />
                                    <S.Name>{mate.nickname}</S.Name>

                                    {mate.status === "MATCHED" && (
                                        <S.IconButton onClick={() => openInstagram(mate.instagramId)} aria-label="인스타그램 보기">
                                            <img src="/images/MailIcon.svg" alt="" />
                                        </S.IconButton>
                                    )}

                                    {mate.status === "SENT" && (
                                        <S.PendingText>
                                            매칭 대기 중...
                                        </S.PendingText>
                                    )}
                                    {mate.status === "RECEIVED" && (
                                        <>
                                        <S.IconButton onClick={() => handleAccept(mate.requestId)} aria-label="메이트 요청 수락">
                                            <img src="/images/AcceptIcon.svg" alt="" />
                                        </S.IconButton>
                                        <S.IconButton onClick={() => handleReject(mate.requestId)} aria-label="메이트 요청 거절">
                                            <img src="/images/RejectIcon.svg" alt="" />
                                        </S.IconButton>
                                        </>
                                    )}
                                </S.Row>
                            ))}
                        </S.List>
                    </div>
                </S.Container>
            </div>
        </main>
    );
}