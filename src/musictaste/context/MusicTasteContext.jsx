import { createContext, useContext, useEffect, useState } from "react";

const MusicTasteContext = createContext(null);
const STORAGE_KEY = "music-taste-draft";

export function MusicTasteProvider({children}) {
  const [taste, setTaste] = useState(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);

    return saved
      ? JSON.parse(saved)
      : {artists: [], genres: [], playlists: []};
  });

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(taste));
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