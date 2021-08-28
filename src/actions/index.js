import axios from "axios";
import * as TYPES from "./types";

export const init = () => async (dispatch) => {
  await dispatch(getGenres());
};

export const counter = () => async (dispatch) => {
  dispatch({
    type: "counter/increment",
  });
};

export const getGenres = () => async (dispatch, getState) => {
  await axios
    .get(`https://api.themoviedb.org/3/genre/movie/list`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWRmMTM3MWQ0YzhmZWU4MWQyNDRmZjBiNzczNDNjZCIsInN1YiI6IjYxMThhMDFlOWYwZTE5MDA1YzM2NGEwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hs7GH3vLCk03mmXkHnhVsnsiThSUorjsDUzy-jDW0Og",
      },
    })
    .then((response) => {
      dispatch({
        type: TYPES.FETCH_GENRES,
        payload: response.data.genres,
      });
    });
};

export const getSearchMovie =
  (query = "") =>
  async (dispatch, getState) => {
    dispatch({ type: TYPES.LOADING_SEARCH_MOVIE });

    const page = getState().searchMovie.data.page;
    await axios
      .get("https://api.themoviedb.org/3/search/movie", {
        params: {
          query: query,
          page: page + 1,
        },
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWRmMTM3MWQ0YzhmZWU4MWQyNDRmZjBiNzczNDNjZCIsInN1YiI6IjYxMThhMDFlOWYwZTE5MDA1YzM2NGEwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hs7GH3vLCk03mmXkHnhVsnsiThSUorjsDUzy-jDW0Og",
        },
      })
      .then((response) => {
        dispatch({
          type: TYPES.FETCH_SEARCH_MOVIE,
          payload: { query: query, ...response.data },
        });
      })
      .catch((error) => {
        dispatch({ type: TYPES.ERROR_SEARCH_MOVIE });
      });
  };

export const getDiscoverMovie =
  (sort_by = "popularity.desc") =>
  async (dispatch, getState) => {
    dispatch({ type: TYPES.LOADING_DISCOVER_MOVIE });

    const page = getState().discoverMovie.data.page;
    await axios
      .get("https://api.themoviedb.org/3/discover/movie", {
        params: {
          page: page + 1,
          sort_by: sort_by,
        },
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWRmMTM3MWQ0YzhmZWU4MWQyNDRmZjBiNzczNDNjZCIsInN1YiI6IjYxMThhMDFlOWYwZTE5MDA1YzM2NGEwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hs7GH3vLCk03mmXkHnhVsnsiThSUorjsDUzy-jDW0Og",
        },
      })
      .then((response) => {
        dispatch({
          type: TYPES.FETCH_DISCOVER_MOVIE,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({ type: TYPES.ERROR_DISCOVER_MOVIE });
      });
  };

export const getPopularMovie = () => async (dispatch, getState) => {
  dispatch({ type: TYPES.LOADING_POPULAR_MOVIE });

  const page = getState().popularMovie.data.page;
  await axios
    .get("https://api.themoviedb.org/3/movie/popular", {
      params: {
        page: page + 1,
      },
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWRmMTM3MWQ0YzhmZWU4MWQyNDRmZjBiNzczNDNjZCIsInN1YiI6IjYxMThhMDFlOWYwZTE5MDA1YzM2NGEwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hs7GH3vLCk03mmXkHnhVsnsiThSUorjsDUzy-jDW0Og",
      },
    })
    .then((response) => {
      dispatch({
        type: TYPES.FETCH_POPULAR_MOVIE,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({ type: TYPES.ERROR_POPULAR_MOVIE });
    });
};

export const getTopRatedMovie = () => async (dispatch, getState) => {
  dispatch({ type: TYPES.LOADING_TOP_RATED_MOVIE });

  const page = getState().topRatedMovie.data.page;
  await axios
    .get("https://api.themoviedb.org/3/movie/top_rated", {
      params: {
        page: page + 1,
      },
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWRmMTM3MWQ0YzhmZWU4MWQyNDRmZjBiNzczNDNjZCIsInN1YiI6IjYxMThhMDFlOWYwZTE5MDA1YzM2NGEwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hs7GH3vLCk03mmXkHnhVsnsiThSUorjsDUzy-jDW0Og",
      },
    })
    .then((response) => {
      dispatch({
        type: TYPES.FETCH_TOP_RATED_MOVIE,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({ type: TYPES.ERROR_TOP_RATED_MOVIE });
    });
};

export const getUpcomingMovie = () => async (dispatch, getState) => {
  dispatch({ type: TYPES.LOADING_UPCOMING_MOVIE });

  const page = getState().upcomingMovie.data.page;
  await axios
    .get("https://api.themoviedb.org/3/movie/upcoming", {
      params: {
        page: page + 1,
      },
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWRmMTM3MWQ0YzhmZWU4MWQyNDRmZjBiNzczNDNjZCIsInN1YiI6IjYxMThhMDFlOWYwZTE5MDA1YzM2NGEwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hs7GH3vLCk03mmXkHnhVsnsiThSUorjsDUzy-jDW0Og",
      },
    })
    .then((response) => {
      dispatch({
        type: TYPES.FETCH_UPCOMING_MOVIE,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({ type: TYPES.ERROR_UPCOMING_MOVIE });
    });
};

export const getTrendingTodayMovie = () => async (dispatch, getState) => {
  dispatch({ type: TYPES.LOADING_TRENDING_TODAY_MOVIE });

  const page = getState().trendingMovie[0].data.page;
  await axios
    .get(`https://api.themoviedb.org/3/trending/movie/day`, {
      params: {
        page: page + 1,
      },
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWRmMTM3MWQ0YzhmZWU4MWQyNDRmZjBiNzczNDNjZCIsInN1YiI6IjYxMThhMDFlOWYwZTE5MDA1YzM2NGEwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hs7GH3vLCk03mmXkHnhVsnsiThSUorjsDUzy-jDW0Og",
      },
    })
    .then((response) => {
      dispatch({
        type: TYPES.FETCH_TRENDING_TODAY_MOVIE,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({ type: TYPES.ERROR_TRENDING_TODAY_MOVIE });
    });
};

export const getTrendingThisWeekMovie = () => async (dispatch, getState) => {
  dispatch({ type: TYPES.LOADING_TRENDING_THISWEEK_MOVIE });

  const page = getState().trendingMovie[1].data.page;
  await axios
    .get(`https://api.themoviedb.org/3/trending/movie/week`, {
      params: {
        page: page + 1,
      },
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWRmMTM3MWQ0YzhmZWU4MWQyNDRmZjBiNzczNDNjZCIsInN1YiI6IjYxMThhMDFlOWYwZTE5MDA1YzM2NGEwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hs7GH3vLCk03mmXkHnhVsnsiThSUorjsDUzy-jDW0Og",
      },
    })
    .then((response) => {
      dispatch({
        type: TYPES.FETCH_TRENDING_THISWEEK_MOVIE,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({ type: TYPES.ERROR_TRENDING_THISWEEK_MOVIE });
    });
};

export const getGenreMovie = (genre) => async (dispatch, getState) => {
  // console.log(getState().counters);
  dispatch({ type: TYPES.LOADING_GENRE_MOVIE });

  const page = getState().genreMovie.data.page;
  await axios
    .get("https://api.themoviedb.org/3/discover/movie", {
      params: {
        page: page + 1,
        with_genres: genre,
      },
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWRmMTM3MWQ0YzhmZWU4MWQyNDRmZjBiNzczNDNjZCIsInN1YiI6IjYxMThhMDFlOWYwZTE5MDA1YzM2NGEwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hs7GH3vLCk03mmXkHnhVsnsiThSUorjsDUzy-jDW0Og",
      },
    })
    .then((response) => {
      dispatch({
        type: TYPES.FETCH_GENRE_MOVIE,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({ type: TYPES.ERROR_GENRE_MOVIE });
    });
};
