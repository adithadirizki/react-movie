import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

const ScroolTopBar = styled.ul`
  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  :hover {
    &::-webkit-scrollbar {
      display: block;
      width: 20px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #e5e7eb;
      border-radius: 20px;
      border: 7px solid transparent;
      background-clip: content-box;
    }
  }
`;

const TopBar = () => {
  const [slider, setSlider] = useState(null);
  const [query, setQuery] = useState("");
  const history = useHistory();

  useEffect(() => {
    setSlider(document.querySelector(".slider"));
  }, []);

  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  };

  const handleMouseLeave = (e) => {
    isDown = false;
  };

  const handleMouseUp = (e) => {
    isDown = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
  };

  const handleSearchMovie = async (e) => {
    e.preventDefault();
    history.push(`/search/${query}`);
  };

  const Categories = () => {
    return (
      <ScroolTopBar
        className="slider col-span-full md:col-span-3 flex items-center md:justify-start space-x-4 text-lg overflow-x-auto cursor-pointer font-inter"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}>
        <Link
          to="/popular"
          className="text-gray-400 hover:text-gray-500 whitespace-nowrap px-2 py-2">
          Popular
        </Link>
        <Link
          to="/top_rated"
          className="text-gray-400 hover:text-gray-500 whitespace-nowrap px-2 py-2">
          Top Rated
        </Link>
        <Link
          to="/upcoming"
          className="text-gray-400 hover:text-gray-500 whitespace-nowrap px-2 py-2">
          Upcoming
        </Link>
      </ScroolTopBar>
    );
  };

  return (
    <>
      <div className="col-span-10 md:col-span-6 flex items-center text-gray-500 bg-gray-100 rounded-full w-full sm:w-3/4 md:w-full space-x-4 px-6 py-2.5">
        <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
        <form className="w-full" onSubmit={handleSearchMovie}>
          <input
            type="text"
            className="focus:outline-none bg-transparent w-full"
            placeholder="Search movie..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </form>
      </div>
      {/* <Categories /> */}
    </>
  );
};

export default TopBar;
