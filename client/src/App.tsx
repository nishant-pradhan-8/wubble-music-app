import PickGenre from "./components/PickGenre";
import PickMood from "./components/PickMood";
import GenerateBtn from "./components/GenerateBtn";
import LikedMusics from "./components/LikedMusicDialog";
import RecentMusics from "./components/RecentMusicDialog";
import MusicPlayerDialog from "./components/MusicPlayerDialog";
import { useAppSelector } from "./hooks/hooks";
import React from "react";

function App() {
  const { currentTrack } = useAppSelector((state) => state.track);
  const [musicPlayerOpen, setMusicPlayerOpen] = React.useState(false);

  React.useEffect(() => {
    if (currentTrack) {
      setMusicPlayerOpen(true);
    }
  }, [currentTrack]);

  const handleCloseMusicPlayer = () => {
    setMusicPlayerOpen(false);
  };

  return (
    <>
      <div className="max-w-[1024px] m-auto px-4">
        <div className="text-3xl font-bold mb-8 text-center">Generate Music As Per Your Mood</div>
        <div>
          <p className="text-center text-lg mb-4">
            Select a genre and mood to generate a unique music track that fits your vibe.
          </p>
         
        </div>
        <div className="flex flex-row gap-4 justify-center mb-4"><LikedMusics /> <RecentMusics /></div>
        <div className="flex flex-col items-center gap-8 ">
          <PickGenre />
          <PickMood />
          <GenerateBtn />
        </div>
      
      </div>
      <MusicPlayerDialog open={musicPlayerOpen} handleClose={handleCloseMusicPlayer} />
    </>
  );
}

export default App;
