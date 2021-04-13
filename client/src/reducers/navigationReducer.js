import {
  NAV_UP,
  NAV_DOWN,
  NAV_REPLACE,
} from "../actions/navigation/navigationTypes";

const initialState = {
  links: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NAV_DOWN:
      return {
        ...state,
        links: [...state.links, action.payload],
      };
    case NAV_UP:
      const filtered = state.links.filter(
        (l) => l.index <= action.payload.index
      );
      filtered[filtered.length - 1].name = action.payload.name;
      filtered[filtered.length - 1].path = action.payload.path;
      return {
        ...state,
        links: filtered,
      };
    case NAV_REPLACE:
      return {
        ...state,
        links: [action.payload],
      };
    default:
      return state;
  }
}
