import {
  REMOVE_SELECTED_CATEGORY,
  REMOVE_SELECTED_ORDER,
  SET_SELECTED_CATEGORY,
  SET_SELECTED_ORDER,
} from "../actions/types";

const initialState = {
  order_by: "desc",
  category_by: "popularity",
};

export default function filterMovie(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_ORDER:
      return {
        ...state,
        order_by: action.payload,
      };
    case REMOVE_SELECTED_ORDER:
      return {
        ...state,
        order_by: initialState.order_by,
      };
    case SET_SELECTED_CATEGORY:
      return {
        ...state,
        category_by: action.payload,
      };
    case REMOVE_SELECTED_CATEGORY:
      return {
        ...state,
        category_by: initialState.category_by,
      };
    default:
      return state;
  }
}
