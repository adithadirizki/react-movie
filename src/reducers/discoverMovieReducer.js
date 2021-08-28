import {
  CLEAR_DISCOVER_MOVIE,
  ERROR_DISCOVER_MOVIE,
  FETCH_DISCOVER_MOVIE,
  LOADING_DISCOVER_MOVIE,
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
    case FETCH_DISCOVER_MOVIE:
      return {
        ...state,
        data: {
          ...action.payload,
          results: [...state.data.results, ...action.payload.results],
        },
        loading: false,
        error: false,
      };
    case LOADING_DISCOVER_MOVIE:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_DISCOVER_MOVIE:
      return initialState;
    case ERROR_DISCOVER_MOVIE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
