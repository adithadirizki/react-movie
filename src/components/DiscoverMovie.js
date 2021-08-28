import { useEffect, useRef } from "react";
import MovieItem from "./MovieItem";
import SkeletonPreload from "./utils/SkeletonPreload";
import { connect, useDispatch } from "react-redux";
import { getDiscoverMovie } from "../actions";
import ErrorMovie from "./utils/Error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faSortAmountDownAlt,
  faSortAmountUpAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  CLEAR_DISCOVER_MOVIE,
  SET_SELECTED_CATEGORY,
  SET_SELECTED_MENU,
  SET_SELECTED_ORDER,
} from "../actions/types";

const DiscoverMovie = ({ filterMovie, discoverMovie, getDiscoverMovie }) => {
  const { page, total_pages } = discoverMovie.data;
  const { order_by, category_by } = filterMovie;
  const dispatch = useDispatch();
  const dropdown = useRef(null);

  useEffect(() => {
    const menu = dropdown.current.nextElementSibling;
    function handleClickDropdown(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        // handle click outside dropdown
        dropdown.current.lastElementChild.classList.remove("-rotate-90");
        menu.style.height = 0;
      } else if (dropdown.current && !menu.clientHeight) {
        dropdown.current.lastElementChild.classList.add("-rotate-90");
        menu.style.height = menu.firstElementChild.clientHeight + "px";
      } else if (dropdown.current && menu.clientHeight) {
        dropdown.current.lastElementChild.classList.remove("-rotate-90");
        menu.style.height = 0;
      }
    }
    document.addEventListener("click", handleClickDropdown);
    return () => {
      document.removeEventListener("click", handleClickDropdown);
    };
  }, [dropdown]);

  useEffect(() => {
    dispatch({ type: SET_SELECTED_MENU, payload: "Discover" });
  }, []);

  useEffect(() => {
    const sort_by = category_by + "." + order_by;
    getDiscoverMovie(sort_by);
    return () => {
      dispatch({ type: CLEAR_DISCOVER_MOVIE });
    };
  }, [order_by, category_by]);

  // infinity scroll with window on scroll
  // window.onscroll = function (e) {
  //   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //     if (discoverMovie.loading) {
  //       return false;
  //     }
  //     getDiscoverMovie();
  //   }
  // };

  // infinity scroll with button
  const loadMore = () => {
    getDiscoverMovie();
  };

  const categories = [
    { label: "Popular", value: "popularity" },
    { label: "Rating", value: "vote_average" },
    { label: "Voting", value: "vote_count" },
    { label: "Release date", value: "release_date" },
  ];

  const LabelCategory = () => {
    if (category_by === "popularity") {
      return "Popular";
    } else if (category_by === "vote_average") {
      return "Rating";
    } else if (category_by === "vote_count") {
      return "Voting";
    } else if (category_by === "release_date") {
      return "Release date";
    }
  };

  const handleChangeSelectedOrder = (e) => {
    const value = e.currentTarget.getAttribute("data-order");
    if (value === "asc") {
      dispatch({ type: SET_SELECTED_ORDER, payload: "desc" });
    } else {
      dispatch({ type: SET_SELECTED_ORDER, payload: "asc" });
    }
  };

  const handleChangeSelectedCategory = (e) => {
    const value = e.target.getAttribute("data-category");
    const menu = e.currentTarget.parentElement;
    const dropdownToggle = menu.previousElementSibling.lastElementChild;
    dropdownToggle.classList.toggle("-rotate-90");
    if (menu.clientHeight) {
      menu.style.height = 0;
    } else {
      menu.style.height = menu.firstElementChild.clientHeight + "px";
    }
    dispatch({ type: SET_SELECTED_CATEGORY, payload: value });
  };

  if (discoverMovie.error) {
    return <ErrorMovie />;
  }

  const OrderBy = () => {
    if (order_by === "asc") {
      return (
        <FontAwesomeIcon icon={faSortAmountDownAlt} className="text-gray-500" />
      );
    } else if (order_by === "desc") {
      return (
        <FontAwesomeIcon icon={faSortAmountUpAlt} className="text-gray-500" />
      );
    } else {
      return <FontAwesomeIcon icon={faTimes} className="text-red-500" />;
    }
  };

  return (
    <>
      <div className="relative flex items-center justify-between mb-8">
        <div className="relative w-48 text-gray-400 hover:bg-gray-50 rounded-sm transition duration-200 cursor-pointer">
          <div
            className="font-inter font-bold uppercase tracking-wide px-4 py-2"
            ref={dropdown}>
            <LabelCategory />
            <button
              type="button"
              className="absolute flex items-center right-0 inset-y-0 pointer-events-none transition duration-200 transform rounded-full text-xs px-4 ml-6">
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
          <div
            className="absolute -bottom-1 font-inter text-gray-600 tracking-wide w-48 transform translate-y-full origin-bottom left-0 z-10 overflow-hidden shadow-xl text-wrap"
            style={{
              height: 0,
              transition: "height .3s ease-out",
            }}>
            <ul
              className="flex flex-col"
              onClick={handleChangeSelectedCategory}>
              {categories.map((category, index) => {
                return (
                  <li
                    key={index}
                    className={
                      (category_by === category.value
                        ? "bg-gray-100 "
                        : "bg-gray-50 ") + "hover:bg-gray-200 px-3 py-2"
                    }
                    data-category={category.value}>
                    {category.label}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <button
          onClick={handleChangeSelectedOrder}
          type="button"
          data-order={order_by}
          className="text-lg transition duration-200 transform hover:scale-110 hover:bg-gray-200 rounded bg-gray-100 px-3 py-1.5">
          <OrderBy />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-y-6 gap-x-4">
        {discoverMovie.data.results.map((value, index) => {
          return <MovieItem movie={value} key={index} />;
        })}
        {discoverMovie.loading ? <SkeletonPreload /> : null}

        {page === total_pages ? null : (
          <div className="col-span-full text-center mt-6">
            <button
              className="font-montserrat border border-gray-400 rounded-full hover:text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-100 focus:border-transparent hover:shadow-lg transition duration-200 px-5 py-1"
              onClick={loadMore}>
              Load more...
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = ({ filterMovie, discoverMovie }) => {
  return { filterMovie, discoverMovie };
};

export default connect(mapStateToProps, { getDiscoverMovie })(DiscoverMovie);
