import {
  REMOVE_SELECTED_MENU,
  SET_SELECTED_MENU,
} from "../actions/types";

const initialState = {
  active: "Discover"
};

export default function filterMovie(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_MENU:
      return {
        ...state,
        active: action.payload,
      };
    case REMOVE_SELECTED_MENU:
      return {
        ...state,
        active: initialState.active,
      };
    default:
      return state;
  }
}
