import {
  CLEAR_GENRE_MOVIE,
  ERROR_GENRE_MOVIE,
  FETCH_GENRE_MOVIE,
  LOADING_GENRE_MOVIE,
} from "../actions/types";

const initialState = {
  data: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  loading: true,
  error: false,
};

export default function discoverMovie(state = initialState, action) {
  switch (action.type) {
    case FETCH_GENRE_MOVIE:
      return {
        ...state,
        data: {
          ...action.payload,
          results: [...state.data.results, ...action.payload.results],
        },
        loading: false,
        error: false,
      };
    case LOADING_GENRE_MOVIE:
      return {
        ...state,
        loading: true,
      };
    case ERROR_GENRE_MOVIE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case CLEAR_GENRE_MOVIE:
      return initialState;
    default:
      return state;
  }
}
