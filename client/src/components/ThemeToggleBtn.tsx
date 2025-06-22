import { toggleTheme } from "../redux/themeSlice";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
export default function ThemeToggleBtn() {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={handleToggleTheme}
        className={`px-4 py-2 rounded-lg transition-colors cursor-pointer duration-300 ${
          theme === "dark"
            ? "bg-gray-700 hover:bg-gray-600 text-white"
            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
        }`}
      >
        {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </button>
    </div>
  );
}
