import {
  FETCH_ALL,
  CREATE,
  GET_SINGLE_POST,
  LIKE,
  FETCH_LIKES,
  GET_USER_UPLOADS,
} from "../constants/actionTypes";

export default (state = { posts: [], post: [], uploads: [] }, action) => {
  switch (action.type) {
    case GET_USER_UPLOADS:
      return { ...state, uploads: action.payload };
    case FETCH_LIKES:
      return { ...state, liked: action.payload };
    case FETCH_ALL:
      return { ...state, posts: action.payload };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case GET_SINGLE_POST:
      return { ...state, post: action.payload };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        post: action.payload,
      };
    // This code is looking for the posts with the matching id and updating it with the response
    default:
      return state;
  }
};
