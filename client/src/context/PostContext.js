import { createContext, useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl, 
         POST_LOADED_FAIL, 
         POST_LOADED_SUCCESS, 
         ADD_POST_SUCCESS, 
         UPDATE_POST_SUCCESS, 
         DELETE_POST_SUCCESS,
         FIND_POST, 
         UPDATE_POST_FAIL} from './constants';
import { PostReducer } from '../reducers/PostReducer'

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  // init state
  const [postState, dispatch] = useReducer(PostReducer, {
    post: null,
    posts: [],
    postLoading: true
  })

  // show addPostModal
  const [showAddPostModal, setShowAddPostModal] = useState(false);

  // show updatePostModal
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  // show toast
  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null
  })
  // life cycle
  // useEffect(() => {
  //   setShowUpdatePostModal(false)
  //   setShowAddPostModal(false)
  // }, [postState.post])

  // getAllPosts
  const getPost = async () => {
    try {
      const response = await axios.get(`${baseUrl}/posts`)
      if (response.data.success) {
        dispatch({
          type: POST_LOADED_SUCCESS,
          payload: response.data.posts
        })
      }
    } catch (error) {
      dispatch({
        type: POST_LOADED_FAIL,
      })
    }
  }
  // Add New Post
  const addNewPost = async newPost => {
    try {
      const response = await axios.post(`${baseUrl}/posts`, newPost);
      if (response.data.success) {
        dispatch({
          type: ADD_POST_SUCCESS,
          payload: response.data.post
        })
        return response.data
      }
    } catch (error) {
      return error.response.data ? error.response.data : {
        success: false,
        message: 'Server Error'
      }
    }
  }
  // delete post
  const deletePost = async postId => {
    try {
      const response = await axios.delete(`${baseUrl}/posts/${postId}`);
      if (response.data.success) {
        dispatch({
          type: DELETE_POST_SUCCESS,
          payload: postId
        })
        return response.data;
      }
    } catch (error) {
      return error.response.data ? error.response.data : {
        success: false,
        message: 'Server Error'
      }
    }
  }

  // find post when clicking on an existing post
  const findPost = postId => {
    if (postState.posts.length != 0) {
      const post = postState.posts.find(post => post._id === postId);
      dispatch({
        type: FIND_POST,
        payload: post
      })
    }
  }

  // updatePost
  const updatePost = async updatedPost => {
    try {
      const response = await axios.put(`${baseUrl}/posts/${updatedPost._id}`, updatedPost);
      if (response.data.success) {
        dispatch({
          type: UPDATE_POST_SUCCESS,
          payload: response.data.post
        })
        return response.data;
      }
    } catch (error) {
      return error.response.data ? error.response.data : {
        success: false,
        message: 'Server Error'
      }
    }
  }
  const postContextData = {
    postState,
    showAddPostModal,
    setShowAddPostModal,
    showUpdatePostModal,
    setShowUpdatePostModal,
    showToast,
    setShowToast,
    getPost,
    addNewPost,
    deletePost,
    findPost,
    updatePost
  }
  return (
    <PostContext.Provider value={postContextData}>
      { children }
    </PostContext.Provider>
  );
}

export default PostContextProvider;