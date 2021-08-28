import { FETCH_GENRES } from "../actions/types";

const initialState = {
  data: [],
};

export default function genres(state = initialState, action) {
  switch (action.type) {
    case FETCH_GENRES:
      return {
        data: action.payload,
      };
    default:
      return state;
  }
}
