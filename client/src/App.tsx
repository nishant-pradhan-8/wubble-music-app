import React from "react";
import PickGenre from "./components/PickGenre";
import PickMood from "./components/PickMood";
import GenerateBtn from "./components/GenerateBtn";
import LikedMusics from "./components/LikedMusicDialog";
import RecentMusics from "./components/RecentMusicDialog";
import MusicPlayerDialog from "./components/MusicPlayerDialog";
import { useAppSelector } from "./hooks/hooks";
import ThemeToggleBtn from "./components/ThemeToggleBtn";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createMuiTheme } from "./theme/muiTheme";

function App() {
  const { theme } = useAppSelector((state) => state.theme);
  const { currentTrack } = useAppSelector((state) => state.track);
  const [musicPlayerOpen, setMusicPlayerOpen] = React.useState(false);

  React.useEffect(() => {
    if (currentTrack) {
      setMusicPlayerOpen(true);
    }
  }, [currentTrack]);

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const handleCloseMusicPlayer = () => {
    setMusicPlayerOpen(false);
  };

  const muiTheme = createMuiTheme(theme);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <div
        className={`w-full min-h-screen flex items-center justify-center transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-[#f8f8ff] text-black"
        }`}
      >
        <div className="max-w-[1024px] m-auto px-4 py-8">
          <ThemeToggleBtn />

          <div className="text-3xl font-bold mb-8 text-center">
            Generate Music As Per Your Mood
          </div>
          <div>
            <p className="text-center text-lg mb-4">
              Select a genre and mood to generate a unique music track that fits
              your vibe.
            </p>
          </div>
          <div className="flex flex-row gap-4 justify-center mb-4">
            <LikedMusics />
            <RecentMusics />
          </div>
          <div className="flex flex-col items-center gap-8">
            <PickGenre />
            <PickMood />
            <GenerateBtn />
          </div>
        </div>
        <MusicPlayerDialog
          open={musicPlayerOpen}
          handleClose={handleCloseMusicPlayer}
        />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
