const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ?? "http://localhost:8080";

async function request(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
  });
  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success === false) {
    throw new Error(result?.message ?? "아티스트 정보를 불러오지 못했습니다.");
  }

  return result?.data ?? [];
}

export const getMyArtists = () =>
  request("/api/music-tastes/artists");

export const searchArtists = (query) =>
  request(`/api/music-tastes/artists/search?query=${encodeURIComponent(query)}`);

export const getGenres = () =>
  request("/api/music-tastes/genres");

export const getMyTracks = () =>
  request("/api/music-tastes/tracks");

export const searchTracks = (query) =>
  request(
    `/api/music-tastes/tracks/search?query=${encodeURIComponent(query)}`,
  );

export async function completeMusicTaste({artists, genres, tracks}) {
  const response = await fetch(`${API_BASE_URL}/api/music-tastes`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      artists,
      genres: genres
        .map((genre) => ({
          genreId:
            typeof genre === "object"
              ? genre.genreId
              : genre,
        }))
        .filter(({genreId}) => Number.isInteger(genreId)),
      tracks,
    }),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success === false) {
    throw new Error(
      result?.message ?? "음악 취향 등록에 실패했습니다.",
    );
  }

  return result?.data;
}