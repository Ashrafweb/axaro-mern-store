import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// ... other imports

const Dropdown = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  Dropdown.propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        link: PropTypes.string,
        onClick: PropTypes.func,
      })
    ).isRequired,
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className='relative inline-block' ref={dropdownRef}>
      {" "}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='text-orange-500 hover:text-white cursor-pointer'
      >
        {items.trigger}
      </button>
      {isOpen && (
        <div className='absolute right-0 top-10 w-[150px] bg-white dark:bg-gray-800 shadow-md rounded-md z-10 transition-opacity duration-300'>
          <ul className='list-none text-left'>
            {items.map((item, index) => (
              <li
                key={index}
                className={`text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 py-2 px-4 ${
                  index < items.length - 1
                    ? "border-b border-gray-200 dark:border-gray-700"
                    : ""
                }`}
              >
                {item.link ? (
                  <Link to={item.link} onClick={item.onClick}>
                    {item.text}
                  </Link>
                ) : (
                  <button onClick={item.onClick} className='w-full text-left'>
                    {item.text}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
