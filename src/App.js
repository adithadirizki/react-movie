import Sidebar from "./components/templates/Sidebar";
import TopBar from "./components/templates/TopBar";
import PopularMovie from "./components/PopularMovie";
import TopRatedMovie from "./components/TopRatedMovie";
import UpcomingMovie from "./components/UpcomingMovie";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DiscoverMovie from "./components/DiscoverMovie";
import MovieDetail from "./components/MovieDetail";
import SearchMovie from "./components/SearchMovie";
import {
  TrendingTodayMovie,
  TrendingThisWeekMovie,
} from "./components/TrendingMovie";
import GenresMovie from "./components/GenresMovie";
import { useEffect, useRef } from "react";
import { getGenres } from "./actions";
import { connect, useDispatch } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { SET_SIDEBAR_MENU } from "./actions/types";

const ScrollSidebar = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  :hover {
    &::-webkit-scrollbar {
      display: block;
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #e5e7eb;
      border-radius: 20px;
      border: 2px solid transparent;
      background-clip: content-box;
    }
  }
`;

function App({ sidebarMenu, getGenres }) {
  const sidebarToggle = useRef(null);
  const sidebar = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickSidebarToggle(event) {
      if (sidebar.current && sidebar.current.contains(event.target)) {
        return;
      } else if (
        sidebarToggle.current &&
        !sidebarToggle.current.contains(event.target)
      ) {
        // handle click outside sidebar
        dispatch({ type: SET_SIDEBAR_MENU, payload: false });
      } else if (sidebarToggle.current && !sidebarMenu.open) {
        dispatch({ type: SET_SIDEBAR_MENU, payload: true });
      } else if (sidebarToggle.current && sidebarMenu.open) {
        dispatch({ type: SET_SIDEBAR_MENU, payload: false });
      }
    }
    document.addEventListener("click", handleClickSidebarToggle);
    return () => {
      document.removeEventListener("click", handleClickSidebarToggle);
    };
  }, [sidebarToggle, sidebarMenu]);

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <>
      <BrowserRouter>
        <main className="grid grid-cols-12 min-h-screen">
          <ScrollSidebar
            ref={sidebar}
            className={`fixed w-56 shadow-xl ${
              sidebarMenu.open ? "translate-x-0" : "-translate-x-56"
            } lg:sticky lg:w-full lg:col-span-2 lg:shadow-md lg:translate-x-0 transition duration-500 transform bg-white top-0 h-screen overflow-y-auto z-10 py-4 px-2`}>
            <Sidebar />
          </ScrollSidebar>
          <div className="col-span-full lg:col-span-10 p-4 sm:px-6 md:px-8">
            <div className="col-span-full grid grid-cols-12 gap-2">
              <TopBar />
              <div className="col-span-2 md:col-span-6 flex items-center justify-end lg:hidden">
                <button
                  className="text-2xl text-gray-400 px-3"
                  ref={sidebarToggle}>
                  <FontAwesomeIcon icon={faBars} />
                </button>
              </div>
            </div>
            <section className="pt-8 md:pt-10">
              <Switch>
                <Route path="/" exact component={DiscoverMovie} />
                <Route path="/search/:query" component={SearchMovie} />
                <Route path="/popular" exact component={PopularMovie} />
                <Route path="/top_rated" exact component={TopRatedMovie} />
                <Route path="/upcoming" exact component={UpcomingMovie} />
                <Route
                  path="/trending/today"
                  exact
                  component={TrendingTodayMovie}
                />
                <Route
                  path="/trending/this_week"
                  exact
                  component={TrendingThisWeekMovie}
                />
                <Route path="/genre/:genre" exact component={GenresMovie} />
                <Route path="/movie/:id" component={MovieDetail} />
              </Switch>
            </section>
          </div>
        </main>
      </BrowserRouter>
    </>
  );
}

const mapStateToProps = ({ sidebarMenu, getGenres }) => {
  return { sidebarMenu, getGenres };
};

export default connect(mapStateToProps, { getGenres })(App);
