import {
  ERROR_TRENDING_THISWEEK_MOVIE,
  ERROR_TRENDING_TODAY_MOVIE,
  FETCH_TRENDING_THISWEEK_MOVIE,
  FETCH_TRENDING_TODAY_MOVIE,
  LOADING_TRENDING_THISWEEK_MOVIE,
  LOADING_TRENDING_TODAY_MOVIE,
} from "../actions/types";

const initialState = [
  {
    data: {
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    },
    loading: true,
    error: false,
  },
  {
    data: {
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    },
    loading: true,
    error: false,
  },
];

export default function trendingMovie(state = initialState, action) {
  switch (action.type) {
    // TREINDING TODAY
    case FETCH_TRENDING_TODAY_MOVIE:
      return [
        {
          ...state[0],
          data: {
            ...action.payload,
            results: [...state[0].data.results, ...action.payload.results],
          },
          loading: false,
          error: false,
        },
        state[1], // trending this week
      ];
    case LOADING_TRENDING_TODAY_MOVIE:
      return [
        {
          ...state[0],
          loading: true,
        },
        state[1], // trending this week
      ];
    case ERROR_TRENDING_TODAY_MOVIE:
      return [
        {
          ...state[0],
          loading: false,
          error: true,
        },
        state[1], // trending this week
      ];

    // TRENDING THIS WEEK
    case FETCH_TRENDING_THISWEEK_MOVIE:
      return [
        state[0], // trending today
        {
          ...state[1],
          data: {
            ...action.payload,
            results: [...state[1].data.results, ...action.payload.results],
          },
          loading: false,
          error: false,
        },
      ];
    case LOADING_TRENDING_THISWEEK_MOVIE:
      return [
        state[0], // trending today
        {
          ...state[1],
          loading: true,
        },
      ];
    case ERROR_TRENDING_THISWEEK_MOVIE:
      return [
        state[0], // trending today
        {
          ...state[1],
          loading: false,
          error: true,
        },
      ];
    default:
      return state;
  }
}
