require("dotenv").config();
const tracks = [
  { id: "1", mood: "Happy", genre: "Pop", title: "Sunshine Pop", file: `${process.env.BACKEND_URL}/music/sample1.mp3` },
  { id: "2", mood: "Happy", genre: "Lo-fi", title: "Morning Lo-fi", file: `${process.env.BACKEND_URL}/music/sample2.mp3` },
  { id: "3", mood: "Happy", genre: "Cinematic", title: "Bright Horizons", file: `${process.env.BACKEND_URL}/music/sample3.mp3` },
  { id: "4", mood: "Happy", genre: "EDM", title: "Uplift Vibes", file: `${process.env.BACKEND_URL}/music/sample4.mp3` },

  { id: "5", mood: "Sad", genre: "Pop", title: "Faded Love", file: `${process.env.BACKEND_URL}/music/sample1.mp3` },
  { id: "6", mood: "Sad", genre: "Lo-fi", title: "Rainy Lo-fi", file: `${process.env.BACKEND_URL}/music/sample2.mp3` },
  { id: "7", mood: "Sad", genre: "Cinematic", title: "Melancholy Score", file: `${process.env.BACKEND_URL}/music/sample3.mp3` },
  { id: "8", mood: "Sad", genre: "EDM", title: "Blue Bassline", file: `${process.env.BACKEND_URL}/music/sample4.mp3` },

  { id: "9", mood: "Energetic", genre: "Pop", title: "Jumpstart", file: `${process.env.BACKEND_URL}/music/sample1.mp3` },
  { id: "10", mood: "Energetic", genre: "Lo-fi", title: "Power Lo-fi", file: `${process.env.BACKEND_URL}/music/sample2.mp3` },
  { id: "11", mood: "Energetic", genre: "Cinematic", title: "Epic Pulse", file: `${process.env.BACKEND_URL}/music/sample3.mp3` },
  { id: "12", mood: "Energetic", genre: "EDM", title: "Rush Hour", file: `${process.env.BACKEND_URL}/music/sample4.mp3` },

  { id: "13", mood: "Chill", genre: "Pop", title: "Relax Pop", file: `${process.env.BACKEND_URL}/music/sample1.mp3` },
  { id: "14", mood: "Chill", genre: "Lo-fi", title: "Evening Vibes", file: `${process.env.BACKEND_URL}/music/sample2.mp3` },
  { id: "15", mood: "Chill", genre: "Cinematic", title: "Slow Motion", file: `${process.env.BACKEND_URL}/music/sample3.mp3` },
  { id: "16", mood: "Chill", genre: "EDM", title: "Drift", file: `${process.env.BACKEND_URL}/music/sample4.mp3` },
];

module.exports = { tracks };