import { AUTH, LOGOUT, FETCH_USER, USER_ID } from "../constants/actionTypes";
import { googleLogout } from "@react-oauth/google";

export default (
  state = { authData: null, userInfo: null, loggedInId: null },
  action
) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(action?.data));
      return { ...state, authData: action?.data };
    case USER_ID:
      localStorage.setItem("profileId", JSON.stringify(action.payload));
      return { ...state, loggedInId: action.payload };
    case LOGOUT:
      googleLogout();
      localStorage.clear();
      return { ...state, authdata: null };
    case FETCH_USER:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};
