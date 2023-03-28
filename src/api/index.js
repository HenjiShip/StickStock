import axios from "axios";

const API = axios.create({
  baseURL: "https://stickstockbackender.onrender.com",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// posts
export const fetchPosts = (page) => API.get(`posts?page=${page}`);
export const createPost = (post) => API.post("/posts", post);
export const getSinglePost = (id) => API.get(`/posts/post/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const getLikedPosts = (id) => API.get(`/posts/user/${id}`);
export const getUserPosts = (id) => API.get(`/posts/user/uploaded/${id}`);
export const deletePost = (id) => API.delete(`/posts/delete/${id}`);
export const updatePost = (id, postData) =>
  API.patch(`/posts/update/${id}`, postData);

// users
export const createUser = (info) => API.post("/users/createuser", info);
export const fetchUser = (creator) => API.get(`users/user/${creator}`);
export const fetchUserId = () => API.get(`/users/fetchuserid`);
