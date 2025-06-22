import { createSlice } from "@reduxjs/toolkit";
import type { MusicTrack } from "../types/types";

interface InitialStates {
  selectedMood: string;
  selectedGenre: string;
  currentTrack: MusicTrack | null;
  likedTracks: MusicTrack[];
  recentTracks: MusicTrack[];
}

const initialState: InitialStates = {
  selectedMood: "",
  selectedGenre: "",
  currentTrack: null,
  likedTracks: JSON.parse(localStorage.getItem("likedTracks") || "[]"),
  recentTracks: JSON.parse(localStorage.getItem("recentTracks") || "[]"),
};

const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    setMood: (state, action) => {
      state.selectedMood = action.payload;
    },
    setGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
    setCurrentTrack: (state, action) => {
      state.currentTrack = { ...action.payload };

      if (
        state.recentTracks.length === 0 ||
        state.recentTracks[0]?.title !== action.payload.title
      ) {
        state.recentTracks.unshift(action.payload);
        state.recentTracks = state.recentTracks.slice(0, 5);
        localStorage.setItem(
          "recentTracks",
          JSON.stringify(state.recentTracks)
        );
      }
    },
    setLikedTracks: (state, action) => {
      const track: MusicTrack = action.payload;
      const exists: MusicTrack | undefined = state.likedTracks.find(
        (t) => t.title === track.title
      );
      if (exists) {
        state.likedTracks = state.likedTracks.filter(
          (t) => t.title !== track.title
        );
      } else {
        state.likedTracks.push(track);
      }

      localStorage.setItem("likedTracks", JSON.stringify(state.likedTracks));
    },
  },
});

export const { setMood, setGenre, setCurrentTrack, setLikedTracks } =
  trackSlice.actions;

export default trackSlice.reducer;
