import {
  ERROR_POPULAR_MOVIE,
  FETCH_POPULAR_MOVIE,
  LOADING_POPULAR_MOVIE,
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

export default function popularMovie(state = initialState, action) {
  switch (action.type) {
    case FETCH_POPULAR_MOVIE:
      return {
        ...state,
        data: {
          ...action.payload,
          results: [...state.data.results, ...action.payload.results],
        },
        loading: false,
        error: false,
      };
    case LOADING_POPULAR_MOVIE:
      return {
        ...state,
        loading: true,
      };
    case ERROR_POPULAR_MOVIE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
