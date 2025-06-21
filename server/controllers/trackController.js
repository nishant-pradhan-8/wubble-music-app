const { tracks } = require("../db/tracks");
require("dotenv").config();

const getTracks = (req, res) => {
  const { mood, genre } = req.query;

  if (!mood || !genre) {
    return res.json({
      success: false,
      messege: "Both Mood and Genre is Required",
      data: null,
    });
  }
  const result = tracks.find((t) => t.mood === mood && t.genre === genre);

  if (!result) {
    return res.json({
      success: false,
      messege: `Music not found with mood ${mood} and genre ${genre} `,
      data: null,
    });
  }
  return res.json({
    success: true,
    messege: `Music Fetched Successfully`,
    data: result,
  });
};

module.exports = { getTracks };
