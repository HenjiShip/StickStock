import * as api from "../api/index.js";

import {
  FETCH_ALL,
  CREATE,
  GET_SINGLE_POST,
  LIKE,
  FETCH_LIKES,
  GET_USER_UPLOADS,
  SET_UPDATE_ID,
} from "../constants/actionTypes";

export const getPosts = (page) => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const getSinglePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.getSinglePost(id);
    dispatch({ type: GET_SINGLE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getLikedPosts = (id) => async (dispatch) => {
  try {
    const { data } = await api.getLikedPosts(id);
    dispatch({ type: FETCH_LIKES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUserPosts(id);
    dispatch({ type: GET_USER_UPLOADS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id, navigate) => async (dispatch) => {
  try {
    await api.deletePost(id);
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const setUpdateId = (postToUpdate, navigate) => async (dispatch) => {
  try {
    dispatch({ type: SET_UPDATE_ID, payload: postToUpdate });
    navigate("/upload");
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, postData) => async (dispatch) => {
  try {
    dispatch({ type: SET_UPDATE_ID, payload: null });
    await api.updatePost(id, postData);
    // i guess if i dont sent back a response, nothing after await runs?
  } catch (error) {
    console.log(error);
  }
};
