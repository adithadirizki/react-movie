import {
  ERROR_UPCOMING_MOVIE,
  FETCH_UPCOMING_MOVIE,
  LOADING_UPCOMING_MOVIE,
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

export default function upcomingMovie(state = initialState, action) {
  switch (action.type) {
    case FETCH_UPCOMING_MOVIE:
      return {
        ...state,
        data: {
          ...action.payload,
          results: [...state.data.results, ...action.payload.results],
        },
        loading: false,
        error: false,
      };
    case LOADING_UPCOMING_MOVIE:
      return {
        ...state,
        loading: true,
      };
    case ERROR_UPCOMING_MOVIE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
