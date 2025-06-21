const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const trackRouter = require("./routes/tracks");
const PORT = 8000;

const corsOptions = {
  origin: "https://wubble-music-application.vercel.app",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/music", express.static(path.join(__dirname, "public/track")));

app.use("/api/track", trackRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
