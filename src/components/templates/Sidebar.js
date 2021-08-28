import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useRef } from "react";

const Sidebar = ({ selectedMenu, genres }) => {
  const dropdownTrends = useRef(null);
  const dropdownGenres = useRef(null);

  const handleDropdown = (e) => {
    const menu = e.currentTarget.firstElementChild;
    const submenu = e.currentTarget.lastElementChild;
    menu.getElementsByTagName("svg")[0].classList.toggle("-rotate-90");
    if (submenu.clientHeight) {
      submenu.style.height = 0;
    } else {
      submenu.style.height = submenu.firstElementChild.clientHeight + "px";
    }
  };

  useEffect(() => {
    if (dropdownGenres) {
      const menuActive =
        dropdownGenres.current.getElementsByClassName("active");
      const submenu = dropdownGenres.current.lastElementChild;
      if (menuActive.length) {
        dropdownGenres.current
          .getElementsByTagName("svg")[0]
          .classList.add("-rotate-90");
        submenu.style.height = submenu.firstElementChild.clientHeight + "px";
      } else {
        dropdownGenres.current
          .getElementsByTagName("svg")[0]
          .classList.remove("-rotate-90");
        submenu.style.height = 0;
      }
    }
    if (dropdownTrends) {
      const menuActive =
        dropdownTrends.current.getElementsByClassName("active");
      const submenu = dropdownTrends.current.lastElementChild;
      if (menuActive.length) {
        dropdownTrends.current
          .getElementsByTagName("svg")[0]
          .classList.add("-rotate-90");
        submenu.style.height = submenu.firstElementChild.clientHeight + "px";
      } else {
        dropdownTrends.current
          .getElementsByTagName("svg")[0]
          .classList.remove("-rotate-90");
        submenu.style.height = 0;
      }
    }
  }, [dropdownGenres, dropdownTrends, selectedMenu]);

  const dropdownActive = (menu) => {
    if (menu === selectedMenu.active) {
      return "bg-gray-500 text-gray-200 ring-2 ring-offset-2 ring-gray-500 active";
    }
    return;
  };

  return (
    <>
      <div className="text-2xl text-center font-montserrat font-extrabold mb-4">
        <Link to={"/"}>ReactMovie</Link>
      </div>
      <div className="border-b-2 border-gray-300 mb-6"></div>
      <ul className="grid gap-y-2 font-ubuntu text-gray-500 tracking-wider">
        <Link
          to={"/"}
          className={`flex items-center justify-between rounded-full hover:shadow hover:bg-gray-500 hover:ring-2 hover:ring-offset-2 hover:ring-gray-500 hover:scale-105 hover:text-gray-200 transform transition duration-300 cursor-pointer px-3 py-1.5 ${dropdownActive(
            "Discover"
          )}`}>
          Discover
        </Link>
        <Link
          to={"/popular"}
          className={`flex items-center justify-between rounded-full hover:shadow hover:bg-gray-500 hover:ring-2 hover:ring-offset-2 hover:ring-gray-500 hover:scale-105 hover:text-gray-200 transform transition duration-300 cursor-pointer px-3 py-1.5 ${dropdownActive(
            "Popular"
          )}`}>
          Popular
        </Link>
        <Link
          to={"/top_rated"}
          className={`flex items-center justify-between rounded-full hover:shadow hover:bg-gray-500 hover:ring-2 hover:ring-offset-2 hover:ring-gray-500 hover:scale-105 hover:text-gray-200 transform transition duration-300 cursor-pointer px-3 py-1.5 ${dropdownActive(
            "Top Rated"
          )}`}>
          Top Rated
        </Link>
        <Link
          to={"/upcoming"}
          className={`flex items-center justify-between rounded-full hover:shadow hover:bg-gray-500 hover:ring-2 hover:ring-offset-2 hover:ring-gray-500 hover:scale-105 hover:text-gray-200 transform transition duration-300 cursor-pointer px-3 py-1.5 ${dropdownActive(
            "Upcoming"
          )}`}>
          Upcoming
        </Link>
        <div
          className="dropdown flex flex-col"
          onClick={handleDropdown}
          ref={dropdownTrends}>
          <div className="flex items-center justify-between rounded-full hover:shadow hover:bg-gray-500 hover:ring-2 hover:ring-offset-2 hover:ring-gray-500 hover:scale-105 hover:text-gray-200 transform transition duration-300 cursor-pointer px-3 py-1.5">
            <div className="">Trending</div>
            <div className="dropdown-toggle px-1">
              <FontAwesomeIcon
                icon={faChevronDown}
                className="transform transition duration-500 text-gray-400 text-sm"
              />
            </div>
          </div>
          <div
            className="submenu overflow-hidden px-3"
            style={{
              height: 0,
              transition: "height .3s ease-out",
            }}>
            <div className="dropdown-menu flex flex-col space-y-2 py-3">
              <Link
                to={"/trending/today"}
                className={`flex items-center justify-between rounded-full hover:shadow hover:bg-gray-500 hover:ring-2 hover:ring-offset-2 hover:ring-gray-500 hover:scale-105 hover:text-gray-200 transform transition duration-300 cursor-pointer px-3 py-1.5 ${dropdownActive(
                  "Today"
                )}`}>
                Today
              </Link>
              <Link
                to={"/trending/this_week"}
                className={`flex items-center justify-between rounded-full hover:shadow hover:bg-gray-500 hover:ring-2 hover:ring-offset-2 hover:ring-gray-500 hover:scale-105 hover:text-gray-200 transform transition duration-300 cursor-pointer px-3 py-1.5 ${dropdownActive(
                  "This Week"
                )}`}>
                This week
              </Link>
            </div>
          </div>
        </div>
        <div
          className="dropdown flex flex-col"
          onClick={handleDropdown}
          ref={dropdownGenres}>
          <div className="flex items-center justify-between rounded-full hover:shadow hover:bg-gray-500 hover:ring-2 hover:ring-offset-2 hover:ring-gray-500 hover:scale-105 hover:text-gray-200 transform transition duration-300 cursor-pointer px-3 py-1.5">
            <div className="">Genres</div>
            <div className="dropdown-toggle px-1">
              <FontAwesomeIcon
                icon={faChevronDown}
                className="transform transition duration-500 text-gray-400 text-sm"
              />
            </div>
          </div>
          <div
            className="submenu overflow-hidden px-3"
            style={{
              height: 0,
              transition: "height .3s ease-out",
            }}>
            <div className="dropdown-menu flex flex-col space-y-2 py-3">
              {genres.data.map((genre, index) => {
                return (
                  <Link
                    to={`/genre/${genre.name}`}
                    className={`flex items-center justify-between rounded-full hover:shadow hover:bg-gray-500 hover:ring-2 hover:ring-offset-2 hover:ring-gray-500 hover:scale-105 hover:text-gray-200 transform transition duration-300 cursor-pointer px-3 py-1.5 ${dropdownActive(
                      genre.name
                    )}`}
                    key={index}>
                    {genre.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </ul>
    </>
  );
};

const mapStateToProps = ({ selectedMenu, genres }) => {
  // console.log(genres);
  return { selectedMenu, genres };
};

export default connect(mapStateToProps)(Sidebar);
