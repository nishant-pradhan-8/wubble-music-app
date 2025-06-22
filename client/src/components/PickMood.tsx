import React from "react";
import { setMood } from "../redux/trackSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const moods:string[] = ["Happy", "Sad", "Energetic", "Chill"];

const PickMood: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedMood } = useAppSelector((state) => state.track);

  return (
    <div className="text-black dark:text-white flex flex-col font-sans">
      <h2 className="text-xl font-bold mb-4 self-start">Pick Mood</h2>
      <div className="flex flex-wrap gap-3 justify-start w-full">
        {moods.map((mood) => (
          <button
            key={mood}
            className={`rounded-xl hover:cursor-pointer px-5 py-3 font-semibold text-sm transition-colors duration-200 ease-in-out
              ${
                selectedMood === mood
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
              }`}
            onClick={() => dispatch(setMood(selectedMood === mood ? "" : mood))}
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PickMood;
