import { createContext, useContext, useEffect, useState } from "react";

const MusicTasteContext = createContext(null);
const STORAGE_KEY = "music-taste-draft";
const INITIAL_TASTE = {
  artists: [],
  genres: [],
  playlists: [],
};

function getStoredTaste() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return INITIAL_TASTE;
    }

    const parsed = JSON.parse(saved);

    return {
      artists: Array.isArray(parsed.artists) ? parsed.artists : [],
      genres: Array.isArray(parsed.genres) ? parsed.genres : [],
      playlists: Array.isArray(parsed.playlists) ? parsed.playlists : [],
    };
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return INITIAL_TASTE;
  }
}

export function MusicTasteProvider({children}) {
  const [taste, setTaste] = useState(getStoredTaste);

  useEffect(() => {
    const hasDraft =
      taste.artists.length > 0 ||
      taste.genres.length > 0 ||
      taste.playlists.length > 0;

    if (hasDraft) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(taste));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [taste]);

  const value = {
    taste,
    setArtists: (nextArtists) =>
      setTaste((previous) => ({
        ...previous,
        artists:
          typeof nextArtists === "function"
            ? nextArtists(previous.artists)
            : nextArtists,
      })),
    setGenres: (nextGenres) =>
      setTaste((previous) => ({
        ...previous,
        genres:
          typeof nextGenres === "function"
            ? nextGenres(previous.genres)
            : nextGenres,
      })),
    setPlaylists: (nextPlaylists) =>
      setTaste((previous) => ({
        ...previous,
        playlists:
          typeof nextPlaylists === "function"
            ? nextPlaylists(previous.playlists)
            : nextPlaylists,
      })),
    resetTaste: () => setTaste(INITIAL_TASTE),
  };

  return (
    <MusicTasteContext.Provider value={value}>
      {children}
    </MusicTasteContext.Provider>
  );
}

export function useMusicTaste() {
  const context = useContext(MusicTasteContext);

  if (!context) {
    throw new Error("MusicTasteProvider 내부에서 사용해야 합니다.");
  }

  return context;
}
