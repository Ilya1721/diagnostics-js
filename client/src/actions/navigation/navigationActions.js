import { NAV_DOWN, NAV_UP, NAV_REPLACE } from "./navigationTypes";
import store from "../../store";

export const addLink = (link) => (dispatch) => {
  const links = store.getState().navigation.links;
  let count = 0;
  for (const ch of link.path) {
    if (ch === "/") {
      count++;
    }
  }
  const linkToInsert = { ...link, index: count };
  if (links.length > 0) {
    const last = links[links.length - 1];
    if (last.index < linkToInsert.index) {
      dispatch({
        type: NAV_DOWN,
        payload: linkToInsert,
      });
    } else if (last.index > linkToInsert.index) {
      dispatch({
        type: NAV_UP,
        payload: linkToInsert,
      });
    } else if (
      last.index === linkToInsert.index &&
      last.path !== linkToInsert.path
    ) {
      dispatch({
        type: NAV_REPLACE,
        payload: linkToInsert,
      });
    }
  } else {
    dispatch({
      type: NAV_DOWN,
      payload: linkToInsert,
    });
  }
};
