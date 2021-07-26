import { POST_LOADED_FAIL, 
         POST_LOADED_SUCCESS, 
         ADD_POST_SUCCESS, 
         DELETE_POST_SUCCESS, 
         UPDATE_POST_SUCCESS,
         FIND_POST, 
         UPDATE_POST_FAIL} from "../context/constants";

export const PostReducer = (state, action) => {
  const { type, payload } = action;
  switch(type) {
    case POST_LOADED_SUCCESS: 
      return {
        ...state,
        posts: payload,
        postLoading: false
      }
    case POST_LOADED_FAIL: 
      return {
        ...state,
        posts: [],
        postLoading: false
      }
    case ADD_POST_SUCCESS:
      if (!state.posts) {
        return {
          ...state,
          posts: [payload]
        }
      }
      return {
        ...state,
        posts: [...state.posts, payload]
      }
    case DELETE_POST_SUCCESS:
      const posts = state.posts.filter(post => post._id !== payload)
      return {
        ...state,
        posts
      }
    case FIND_POST:
      return {
        ...state,
        post: payload
      }
    case UPDATE_POST_SUCCESS: 
      const newPosts = state.posts.map(post => post._id === payload._id ? payload : post)
      return {
        ...state,
        posts: newPosts
      }
    case UPDATE_POST_FAIL:
      return {
        ...state,
      }
    default: 
      return state 
  }
}