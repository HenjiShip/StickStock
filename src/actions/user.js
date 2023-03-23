import * as api from "../api/index.js";
import { FETCH_USER, USER_ID } from "../constants/actionTypes.js";

export const createUser = (info) => async (dispatch) => {
  try {
    const { data } = await api.createUser(info);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUser = (creator) => async (dispatch) => {
  try {
    const { data } = await api.fetchUser(creator);
    dispatch({ type: FETCH_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserId = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUserId();
    dispatch({ type: USER_ID, payload: data });
  } catch (error) {}
};
