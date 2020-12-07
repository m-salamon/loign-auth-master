import * as types from './types';
import axios from 'axios';
import setHeader from '../utils/setHeader';
import clearStorage from '../utils/clearLocalStorage';


function addErrorsSuccess(errorObj) {
  return dispatch => {
    dispatch({ type: types.ADD_ERROR_SUCCESS, payload: errorObj })
  }
}

function removeErrorSuccess(errorObj) {
  return dispatch => {
    dispatch({ type: types.REMOVE_ERROR_SUCCESS, payload: errorObj })
  }
}

function FormIsSubmited(isSubmitted) {
  return dispatch => {
    dispatch({ type: types.FORM_IS_SUBMITTED, payload: isSubmitted })
  }
}
function addShouldSubmit(shouldSubmitObj) {
  return dispatch => {
    dispatch({ type: types.ADD_SHOULD_SUBMIT, payload: shouldSubmitObj })
  }
}

function changeShouldSubmit(shouldSubmitObj) {
  return dispatch => {
    dispatch({ type: types.CHANGE_SHOULD_SUBMIT, payload: shouldSubmitObj })
  }
}

function clearShouldSubmit() {
  return dispatch => {
    dispatch({ type: types.CLEAR_SHOULD_SUBMIT, payload: [] })
  }
}

function getUserProfile() {
  return async dispatch => {
    let response = await Axios('api/users/getUserProfile')
    if(!response)
      return

    dispatch({ type: types.GET_USER_PROFILE, payload: response.data })
  }
}

//UTILS FUNCTIONS

function authenticate() {
  return async dispatch => {
    try {
      let response = await axios.get(`/api/users/checkLog`, setHeader());
      if (response.data.error)
        return dispatch({ type: types.UNAUTH_USER, payload: '' })

      dispatch({ type: types.AUTH_USER, payload: response.data })
    } catch (e) {
      dispatch({ type: types.UNAUTH_USER, payload: '' })
    }
  }
}

async function Axios(path) {
  try {
    let response = await axios.get(path, setHeader());
    if (response.data.error) {
      clearStorage();
      authenticate()
      return false 
    }
    return response
  } catch (e) {
    console.log('Axios Error', e)
  }

}

export {
  addErrorsSuccess,
  removeErrorSuccess,
  FormIsSubmited,
  addShouldSubmit,
  changeShouldSubmit,
  clearShouldSubmit,
  authenticate,
  getUserProfile
}