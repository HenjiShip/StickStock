import { AUTH, LOGOUT, FETCH_USER } from "../constants/actionTypes";
import { googleLogout } from "@react-oauth/google";

export default (state = { authData: null, userInfo: [] }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(action?.data));
      return { ...state, authData: action?.data };
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
