import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DownloadIcon from "@mui/icons-material/Download";
import { Box, Slider, Button, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setLikedTracks } from "../redux/trackSlice";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
    minWidth: 400,
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface MusicPlayerProps {
  open: boolean;
  handleClose: () => void;
}

export default function MusicPlayerDialog({
  open,
  handleClose,
}: MusicPlayerProps) {
  const dispatch = useAppDispatch();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { currentTrack, likedTracks } = useAppSelector((state) => state.track);

  // Check if current track is liked when it changes
  React.useEffect(() => {
    if (currentTrack) {
      const isTrackLiked = likedTracks.some(track => track.title === currentTrack.title);
      setIsLiked(isTrackLiked);
    }
  }, [currentTrack, likedTracks]);

 const handlePlayPause = async () => {
  if (audioRef.current) {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {

        await audioRef.current.play();
        setIsPlaying(true);
     
      
    }
  }
};


  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (_event: Event, value: number | number[]) => {
    if (audioRef.current && typeof value === "number") {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handleLike = () => {
    dispatch(setLikedTracks(currentTrack));
    setIsLiked(!isLiked);
  };

  const handleStartEnd = (moveTo: string) => {
    if (audioRef.current) {
      if (moveTo === "start") {
        audioRef.current.currentTime = 0;
      }else if(moveTo==="end"){
        audioRef.current.currentTime = duration;
      }
    }
  };
const handleDownload = async () => {
  if (!currentTrack?.file || !currentTrack?.title) {
    window.alert("No file available for download.");
    return;
  }

  try {
    const response = await fetch(currentTrack.file, {
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch file");
    }

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${currentTrack.title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(blobUrl);
  } catch (error) {

    window.alert("Something went wrong while downloading the file.");
  }
};


  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  React.useEffect(() => {
    if (audioRef.current && open && currentTrack?.file) {
      audioRef.current.load();
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(false);
    }
  }, [currentTrack, open]);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="music-player-dialog"
        open={open}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="music-player-dialog">
          <Typography variant="h6" component="div">
            Now Playing
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            {/* Album Art Placeholder */}
            <Box
              sx={{
                width: 200,
                height: 200,
                mx: "auto",
                mb: 2,
                borderRadius: 2,
                backgroundColor: "grey.300",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" color="text.secondary">
                🎵
              </Typography>
            </Box>

            {/* Song Info */}
            <Typography variant="h6" gutterBottom>
              {currentTrack?.title || "Song Title"}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <span className="font-bold">Genre:</span> {currentTrack?.genre || "Genre"} |   <span className="font-bold">Mood:</span> {currentTrack?.mood || "Mood"}
            </Typography>
           
          </Box>

          {/* Audio Player */}
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            style={{ display: "none" }}
          >
            <source src={currentTrack?.file} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>

          {/* Progress Bar */}
          <Box sx={{ mb: 2 }}>
            <Slider
              value={currentTime}
              max={duration}
              onChange={handleSeek}
              sx={{ color: "primary.main" }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="caption" color="text.secondary">
                {formatTime(currentTime)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatTime(duration)}
              </Typography>
            </Box>
          </Box>

          {/* Control Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 3,
            }}
          >
            <IconButton onClick={() => handleStartEnd("start")} size="large">
              <SkipPreviousIcon />
            </IconButton>
            <IconButton
              size="large"
              onClick={handlePlayPause}
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": { backgroundColor: "primary.dark" },
                mx: 2,
              }}
            >
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton onClick={() => handleStartEnd("end")} size="large">
              <SkipNextIcon />
            </IconButton>
          </Box>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="outlined"
              startIcon={
                isLiked ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )
              }
              onClick={handleLike}
            >
              {isLiked ? "Liked" : "Like"}
            </Button>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
            >
              Download
            </Button>
          </Stack>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
