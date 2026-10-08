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