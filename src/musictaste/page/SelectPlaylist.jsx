import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import ListTitle from "../../components/ListTitle";
import SearchBar from "../../components/SearchBar";
import TrackItem from "../../components/TrackItem";
import { completeMusicTaste, getMyTracks, searchTracks, } from "../api/musicTasteApi";
import { useMusicTaste } from "../context/MusicTasteContext";
import * as S from "../style/StyledSelectArtist";

export default function SelectPlaylist() {
  const navigate = useNavigate();
  const {taste, setPlaylists} = useMusicTaste();

  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadMyTracks() {
      try {
        const tracks = await getMyTracks();

        if (taste.playlists.length === 0) {
          setPlaylists(tracks);
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadMyTracks();
  }, []);

  const visibleSearchResults = useMemo(
    () =>
      searchResults.filter(
        (result) =>
          !taste.playlists.some(
            (track) =>
              track.spotifyTrackId === result.spotifyTrackId,
          ),
      ),
    [searchResults, taste.playlists],
  );

  const handleSearch = async (query) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      setErrorMessage("");
      setSearchResults(await searchTracks(trimmedQuery));
    } catch (error) {
      setErrorMessage(error.message);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const addTrack = (track) => {
    setPlaylists((previous) => {
      const alreadySelected = previous.some(
        (item) => item.spotifyTrackId === track.spotifyTrackId,
      );

      return alreadySelected ? previous : [...previous, track];
    });
  };

  const removeTrack = (trackId) => {
    setPlaylists((previous) =>
      previous.filter(
        (track) => track.spotifyTrackId !== trackId,
      ),
    );
  };

  const handleComplete = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await completeMusicTaste({
        artists: taste.artists,
        genres: taste.genres,
        tracks: taste.playlists,
      });

      sessionStorage.removeItem("music-taste-draft");
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-layout page-layout--with-button">
      <div className="page-content">
        <div style={{paddingTop: "60px"}}/>

        <BackButton onClick={() => navigate(-1)}/>

        <div style={{paddingTop: "30px"}}/>

        <S.Content>
          <S.SearchHeader>
            <S.Title>
              <S.TitleAccent>마지막 단계예요</S.TitleAccent>
              <S.TitleNormal>
                나만의 플레이리스트를 만들어주세요
              </S.TitleNormal>
            </S.Title>

            <SearchBar
              value={keyword}
              onChange={setKeyword}
              onSearch={handleSearch}
              placeholder="곡을 검색해주세요"
            />
          </S.SearchHeader>

          <S.Selected>
            {isLoading ? (
              <S.InfoText>불러오는 중...</S.InfoText>
            ) : taste.playlists.length === 0 ? (
              <S.InfoText>선택된 곡이 없어요.</S.InfoText>
            ) : (
              taste.playlists.map((track) => (
                <TrackItem
                  key={track.spotifyTrackId}
                  imageUrl={track.imageUrl}
                  trackName={track.trackName}
                  artistName={track.artistName}
                  selected
                  onButtonClick={() =>
                    removeTrack(track.spotifyTrackId)
                  }
                />
              ))
            )}
          </S.Selected>

          <S.SearchResult>
            <ListTitle title="검색 결과"/>

            <S.SearchResultList>
              {isSearching ? (
                <S.InfoText>검색 중...</S.InfoText>
              ) : visibleSearchResults.length === 0 ? (
                <S.InfoText>검색 결과가 없어요.</S.InfoText>
              ) : (
                visibleSearchResults.map((track) => (
                  <TrackItem
                    key={track.spotifyTrackId}
                    imageUrl={track.imageUrl}
                    trackName={track.trackName}
                    artistName={track.artistName}
                    onButtonClick={() => addTrack(track)}
                  />
                ))
              )}
            </S.SearchResultList>
          </S.SearchResult>
        </S.Content>

        {errorMessage && <p role="alert">{errorMessage}</p>}
      </div>

      <Button
        type="button"
        variant="white"
        disabled={isSubmitting}
        onClick={handleComplete}
        style={{
          position: "absolute",
          left: "31px",
          right: "31px",
          bottom: "55px",
          width: "auto",
        }}
      >
        {isSubmitting ? "등록 중..." : "취향 완성하기"}
      </Button>
    </main>
  );
}