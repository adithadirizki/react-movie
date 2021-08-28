import {
  CLEAR_SEARCH_MOVIE,
  ERROR_SEARCH_MOVIE,
  FETCH_SEARCH_MOVIE,
  LOADING_SEARCH_MOVIE,
} from "../actions/types";

const initialState = {
  query: "",
  data: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  loading: true,
  error: false,
};

export default function searchMovie(state = initialState, action) {
  switch (action.type) {
    case FETCH_SEARCH_MOVIE:
      return {
        ...state,
        query: action.payload.query,
        data: {
          ...action.payload,
          results: [...state.data.results, ...action.payload.results],
        },
        loading: false,
        error: false,
      };
    case LOADING_SEARCH_MOVIE:
      return {
        ...state,
        loading: true,
      };
    case ERROR_SEARCH_MOVIE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case CLEAR_SEARCH_MOVIE:
      return initialState;
    default:
      return state;
  }
}
