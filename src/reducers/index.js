import { combineReducers } from "redux";
import sidebarMenuReducer from "./sidebarMenuReducer";
import selectedMenuReducer from "./selectedMenuReducer";
import filterMovieReducer from "./filterMovieReducer";
import genresReducer from "./genresReducer";
import userReducer from "./usersReducer";
import counterReducer from "./counterReducer";
import searchMovieReducer from "./searchMovieReducer";
import discoverMovieReducer from "./discoverMovieReducer";
import popularMovieReducer from "./popularMovieReducer";
import topRatedMovieReducer from "./topRatedMovieReducer";
import upcomingMovieReducer from "./upcomingMovieReducer";
import trendingMovieReducer from "./trendingMovieReducer";
import genreMovieReducer from "./genreMovieReducer";

export default combineReducers({
  counters: counterReducer,
  users: userReducer,
  sidebarMenu: sidebarMenuReducer,
  selectedMenu: selectedMenuReducer,
  filterMovie: filterMovieReducer,
  genres: genresReducer,
  searchMovie: searchMovieReducer,
  discoverMovie: discoverMovieReducer,
  popularMovie: popularMovieReducer,
  topRatedMovie: topRatedMovieReducer,
  upcomingMovie: upcomingMovieReducer,
  trendingMovie: trendingMovieReducer,
  genreMovie: genreMovieReducer,
});
