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
      localStorage.setItem(
        "navigation",
        JSON.stringify([...state.links, action.payload])
      );
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
      localStorage.setItem("navigation", JSON.stringify(filtered));
      return {
        ...state,
        links: filtered,
      };
    case NAV_REPLACE:
      localStorage.setItem("navigation", JSON.stringify(action.payload));
      return {
        ...state,
        links: action.payload,
      };
    default:
      return state;
  }
}
