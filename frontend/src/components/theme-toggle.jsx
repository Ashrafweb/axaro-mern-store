import { BsSunFill } from "react-icons/bs";
import { IoMoonOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { apptheme, toggleTheme } from "../redux/features/theme/themeSlice";

function ThemeToggle() {
  const isDark = useSelector(apptheme);
  const dispatch = useDispatch();

  return (
    <div
      className={`flex justify-center items-center cursor-pointer transition-transform duration-500 ${
        isDark ? "rotate-180" : "rotate-0"
      }`}
      onClick={() => {
        dispatch(toggleTheme());
      }}
    >
      {isDark ? (
        <BsSunFill className='h-6 w-6 text-yellow-500 rotate-0 transition-all' />
      ) : (
        <IoMoonOutline className='h-6 w-6 text-white rotate-0 transition-all' />
      )}
    </div>
  );
}

export default ThemeToggle;
