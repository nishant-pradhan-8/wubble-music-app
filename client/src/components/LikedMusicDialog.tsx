import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import type { MusicTrack } from "../types/types";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { setLikedTracks, setCurrentTrack } from "../redux/trackSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const TrackItem = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.mode === "dark" ? "#2c2c2c" : "#f5f5f5",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#383838" : "#e8e8e8",
  },
}));

const TrackInfo = styled("div")({
  flex: 1,
  marginLeft: 16,
});

export default function LikedMusics() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const likedTracks = useAppSelector((state) => state.track.likedTracks);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveFromLiked = (track: MusicTrack) => {
    dispatch(setLikedTracks(track));
  };

  const handlePlayTrack = (track: MusicTrack) => {
    dispatch(setCurrentTrack(track));
  };

  return (
    <React.Fragment>
      <button
        className="underline cursor-pointer hover:text-amber-300 text-black dark:text-white"
        onClick={handleClickOpen}
      >
        Liked Musics ({likedTracks.length})
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Liked Music Tracks
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {likedTracks.length === 0 ? (
            <Typography variant="body1" color="text.secondary" align="center">
              No liked tracks yet. Start liking some music!
            </Typography>
          ) : (
            <div>
              {likedTracks.map((track: MusicTrack, index: number) => (
                <TrackItem
                  key={`${track.title}-${index}`}
                  onClick={() => handlePlayTrack(track)}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayTrack(track);
                      }}
                      sx={{ color: "#f0c929" }}
                    >
                      <PlayArrowIcon />
                    </IconButton>
                    <TrackInfo>
                      <Typography variant="subtitle1" component="div">
                        {track.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {track.genre} • {track.mood}
                      </Typography>
                    </TrackInfo>
                  </div>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromLiked(track);
                    }}
                    sx={{ color: "error.main" }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </TrackItem>
              ))}
            </div>
          )}
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
