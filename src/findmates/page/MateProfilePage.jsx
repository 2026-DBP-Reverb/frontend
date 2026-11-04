import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { getMateProfile, requestMate } from "../api/mateApi";
import * as S from "../style/StyledMateProfile";
import ArtistItem from "../../components/ArtistItem";
import TrackItem from "../../components/TrackItem";

export default function MateProfilePage() {
    const { memberId } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [tab, setTab] = useState("genre");

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
        actionButton = <S.ActionButton disabled>매칭 완료</S.ActionButton>;
    } else if (profile.requestStatus === "SENT") {
        actionButton = <S.ActionButton disabled>수락 대기 중</S.ActionButton>;
    } else if (profile.requestStatus === "RECEIVED") {
        actionButton = <S.ActionButton onClick={() => navigate("/mypage/mates")}>받은 요청 확인</S.ActionButton>;    } else {
        actionButton = <S.ActionButton onClick={handleRequest}>메이트 신청</S.ActionButton>;
    }

    return (
        <main className="page-layout">
            <div className="page-content">
                <S.Container>
                    <BackButton onClick={() => navigate(-1)} />

                    <S.Content>
                        <S.ProfileCard>
                            <S.ProfileImage src={profile.profileImageUrl} alt="" />
                            <S.Info>
                                <S.Nickname>{profile.nickname}</S.Nickname>
                                <S.Instagram>
                                    Instagram {profile.instagramId ? `@${profile.instagramId}` : "매칭 후 공개돼요"}
                                </S.Instagram>
                                {actionButton}
                            </S.Info>
                        </S.ProfileCard>

                        <div>
                            <S.TabBar>
                                <S.Tab $active={tab === "genre"} onClick={() => setTab("genre")}>장르</S.Tab>
                                <S.Tab $active={tab === "artist"} onClick={() => setTab("artist")}>아티스트</S.Tab>
                                <S.Tab $active={tab === "track"} onClick={() => setTab("track")}>플레이리스트</S.Tab>
                            </S.TabBar>

                            <S.TabPanel>
                                {tab === "genre" && (
                                    <S.GenreList>
                                        {profile.genres.map((genre) => (
                                            <S.GenreCircle key={genre.genreId}>{genre.genreName}</S.GenreCircle>
                                        ))}
                                    </S.GenreList>
                                )}

                                {tab === "artist" && (
                                    profile.artists.map((artist, i, list) => (
                                        <ArtistItem
                                            key={artist.spotifyArtistId}
                                            imageUrl={artist.imageUrl}
                                            name={artist.artistName}
                                            buttonVisible={false}
                                            showDivider={i < list.length - 1}
                                        />
                                    ))
                                )}

                                {tab === "track" && (
                                    profile.tracks.map((track, i, list) => (
                                        <TrackItem
                                            key={track.spotifyTrackId}
                                            imageUrl={track.imageUrl}
                                            trackName={track.trackName}
                                            artistName={track.artistName}
                                            buttonVisible={false}
                                            showDivider={i < list.length - 1}
                                        />
                                    ))
                                )}
                            </S.TabPanel>
                        </div>
                    </S.Content>
                </S.Container>
            </div>
        </main>
    );
}