import * as api from "../api/index.js";
import { FETCH_USER } from "../constants/actionTypes.js";

export const createUser = (info) => async (dispatch) => {
  try {
    const { data } = await api.createUser(info);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.fetchUser(userId);
    dispatch({ type: FETCH_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
