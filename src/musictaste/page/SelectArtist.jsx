import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyArtists, searchArtists } from "../api/musicTasteApi";
import { useMusicTaste } from "../context/MusicTasteContext";
import BackButton from "../../components/BackButton";
import SearchBar from "../../components/SearchBar";
import ArtistItem from "../../components/ArtistItem";
import ListTitle from "../../components/ListTitle";
import Button from "../../components/Button";
import * as S from "../style/StyledSelectArtist";


export default function SelectArtist() {
  const navigate = useNavigate();
  const {taste, setArtists} = useMusicTaste();

  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadMyArtists() {
      try {
        const artists = await getMyArtists();

        // 이전 화면에서 선택한 값이 없을 때 서버의 기존 취향을 초기값으로 사용
        if (taste.artists.length === 0) {
          setArtists(artists);
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadMyArtists();
  }, []);

  const visibleSearchResults = useMemo(
    () =>
      searchResults.filter(
        (result) =>
          !taste.artists.some(
            (artist) =>
              artist.spotifyArtistId === result.spotifyArtistId,
          ),
      ),
    [searchResults, taste.artists],
  );

  const handleSearch = async (query) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      setErrorMessage('');
      setSearchResults(await searchArtists(trimmedQuery));
    } catch (error) {
      setErrorMessage(error.message);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const addArtist = (artist) => {
    setArtists((previous) => {
      const alreadySelected = previous.some(
        (item) => item.spotifyArtistId === artist.spotifyArtistId,
      );

      return alreadySelected ? previous : [...previous, artist];
    });
  };
  
  const removeArtist = (artistId) => {
    setArtists(
      taste.artists.filter(
        (artist) => artist.spotifyArtistId !== artistId,
      ),
    );
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
              <S.TitleAccent>취향을 등록해볼까요</S.TitleAccent>
              <S.TitleNormal>좋아하는 아티스트를 선택해주세요</S.TitleNormal>
            </S.Title>
            <SearchBar
              value={keyword}
              onChange={setKeyword}
              placeholder="아티스트를 검색해주세요"
              onSearch={handleSearch}
            />
          </S.SearchHeader>

          <S.Selected>
            {isLoading ? (
              <S.InfoText>불러오는 중...</S.InfoText>
            ) : taste.artists.length === 0 ? (
              <S.InfoText>추가된 아티스트가 없어요.</S.InfoText>
            ) : (
              taste.artists.map((artist) => (
                <ArtistItem
                  key={artist.spotifyArtistId}
                  imageUrl={artist.imageUrl}
                  name={artist.artistName}
                  selected
                  onButtonClick={() => removeArtist(artist.spotifyArtistId)}
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
                visibleSearchResults.map((artist) => (
                  <ArtistItem
                    key={artist.spotifyArtistId}
                    imageUrl={artist.imageUrl}
                    name={artist.artistName}
                    onButtonClick={() => addArtist(artist)}
                  />
                ))
              )}
            </S.SearchResultList>
          </S.SearchResult>
        </S.Content>
      </div>

      <Button
        type="button"
        variant="white"
        disabled={taste.artists.length === 0}
        onClick={() => navigate("/music-taste/genres")}
        style={{
          position: 'absolute',
          left: '31px',
          right: '31px',
          bottom: '55px',
          width: 'auto',
        }}
      >
        다음으로
      </Button>
    </main>
  );
}