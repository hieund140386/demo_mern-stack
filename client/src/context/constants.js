export const baseUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' : 'deployURL';

export const LOCAL_STORAGE_TOKEN_NAME = 'accessToken';

export const POST_LOADED_SUCCESS = 'POST_LOADED_SUCCESS';

export const POST_LOADED_FAIL = 'POST_LOADED_FAIL';

export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';

export const ADD_POST_FAIL = 'ADD_POST_FAIL';

export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';

export const DELETE_POST_FAIL = 'DELETE_POST_FAIL';

export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';

export const UPDATE_POST_FAIL = 'UPDATE_POST_FAIL';

export const FIND_POST = 'FIND_POST';

export const SET_AUTH = 'SET_AUTH';

export const courseStatus = {
  Learnt: 'Learnt',
  ToLearn: 'To Learn',
  Learning: 'Learning'
}