import {
  REMOVE_SIDEBAR_MENU,
  SET_SIDEBAR_MENU,
} from "../actions/types";

const initialState = {
  open: false
};

export default function sidebarMenu(state = initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR_MENU:
      return {
        ...state,
        open: action.payload,
      };
    case REMOVE_SIDEBAR_MENU:
      return {
        ...state,
        open: initialState.open,
      };
    default:
      return state;
  }
}
