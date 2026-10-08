import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import GenreButton from "../../components/GenreButton";
import { getGenres } from "../api/musicTasteApi";
import { useMusicTaste } from "../context/MusicTasteContext";
import * as S from "../style/StyledSelectGenre";

const GENRE_POSITIONS = [
  {x: 20, y: 15}, // KPOP
  {x: 79, y: 13}, // JPOP
  {x: 50, y: 28}, // INDIE
  {x: 20, y: 45}, // CLASSIC
  {x: 83, y: 43}, // POP
  {x: 64, y: 59}, // HIPHOP
  {x: 33, y: 70}, // R&B
  {x: 84, y: 77}, // JAZZ
  {x: 20, y: 90}, // ROCK
  {x: 60, y: 90}, // EDM
];

export default function SelectGenre() {
  const navigate = useNavigate();
  const {taste, setGenres} = useMusicTaste();

  const [genres, setGenreList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadGenres() {
      try {
        const data = await getGenres();
        setGenreList(data);

        // 아직 임시 저장된 선택이 없을 때만 서버의 기존 선택값으로 초기화
        if (taste.genres.length === 0) {
          setGenres(data.filter((genre) => genre.selected));
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadGenres();
  }, []);

  const isSelected = (genreId) =>
    taste.genres.some((genre) => genre.genreId === genreId);

  const toggleGenre = (genre) => {
    setGenres((previous) => {
      const alreadySelected = previous.some(
        (item) => item.genreId === genre.genreId,
      );

      return alreadySelected
        ? previous.filter((item) => item.genreId !== genre.genreId)
        : [...previous, genre];
    });
  };

  return (
    <main className="page-layout page-layout--with-button">
      <div className="page-content">
        <div style={{paddingTop: "60px"}}/>

        <BackButton onClick={() => navigate(-1)}/>

        <div style={{paddingTop: "30px"}}/>

        <S.Content>
          <S.Title>
            <S.TitleAccent>취향을 등록해볼까요</S.TitleAccent>
            <S.TitleNormal>좋아하는 장르를 선택해주세요</S.TitleNormal>
          </S.Title>

          <S.GenreFrame>
            {genres.map((genre, index) => {
              const position = GENRE_POSITIONS[index];

              return (
                <S.GenrePosition
                  key={genre.genreId}
                  $x={position.x}
                  $y={position.y}
                >
                  <S.GenreMotion
                    $duration={3.5 + (index % 3) * 0.5}
                    $delay={-index * 0.35}
                  >
                    <GenreButton
                      name={genre.genreName}
                      selected={isSelected(genre.genreId)}
                      onClick={() => toggleGenre(genre)}
                    />
                  </S.GenreMotion>
                </S.GenrePosition>
              );
            })}
          </S.GenreFrame>
        </S.Content>

        {errorMessage && <p role="alert">{errorMessage}</p>}
      </div>

      <Button
        type="button"
        variant="white"
        disabled={taste.genres.length === 0}
        onClick={() => navigate("/music-taste/playlists")}
        style={{
          position: "absolute",
          left: "31px",
          right: "31px",
          bottom: "55px",
          width: "auto",
        }}
      >
        다음으로
      </Button>
    </main>
  );
}