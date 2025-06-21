import React from "react";
import { setCurrentTrack } from "../redux/trackSlice";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const GenerateBtn: React.FC = () => {
    const dispatch = useAppDispatch();
    const apiUrl: string = import.meta.env.VITE_API_URL;
     const { selectedMood, selectedGenre
      
     } = useAppSelector((state) => state.track);
    const [loading, setLoading] = React.useState<boolean>(false);

  const generateTrack = async (): Promise<void> => {
  if (!selectedMood || !selectedGenre) {
    window.alert("Please select both mood and genre before generating a track.");
    return;
  }
  setLoading(true);
  try {
    await new Promise((res) => setTimeout(res, 2000));
    const response = await axios.get(
      `${apiUrl}/api/track?mood=${selectedMood}&genre=${selectedGenre}`
    );
    dispatch(setCurrentTrack(response.data.data));
 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      window.alert(error.response?.data?.message || "An error occurred while generating the track.");
    } else {
      window.alert("An error occurred while generating the track.");
    }
  } finally {
    setLoading(false);
  }
};

  
  return (
<div className="flex flex-row items-center justify-center" >
<button disabled={!selectedGenre || !selectedMood || loading}  onClick={generateTrack} title="Select both Genre and Mood" className="bg-yellow-400 disabled:bg-gray-500  cursor-pointer disabled:cursor-not-allowed text-black font-bold py-3 px-8 rounded-xl hover:bg-yellow-500 transition-colors duration-300 ease-in-out text-lg">
       {loading?"Generating....":"Generate"}
      </button>
</div>
     
 
  );
};

export default GenerateBtn;
