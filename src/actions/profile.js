import fetch from 'isomorphic-fetch';
import * as types from '../constants/profile';
import config from '../config';
import { getHeaders } from '../utils';

const toastr = window.toastr;

export function fetchProfile(accountId, successCallback, errorCallback) {
  return dispatch => {
    let isError = false;
    const returnObj = { type: types.GET_ACCOUNT, payload: {} };
    fetch(`${config.baseUrl}api/v1/accounts/${accountId}/`,
      { method: 'GET',
        headers: getHeaders(),
        credentials: 'include'
      })
      .then(response => {
        if (response.status >= 400) {
          returnObj.payload.isAuth = false;
          isError = true;
          dispatch(returnObj);
        }
        return response.json();
      })
      .then(json => {
        if (!isError) {
          if (successCallback) successCallback.apply();
          returnObj.payload = json;
          window.localStorage.setItem('accountId', accountId);
          returnObj.payload.isAuth = true;
          dispatch(returnObj);
        } else {
          if (errorCallback) errorCallback.apply();
        }
      });
  };
}

export function login(data, successCallback, errorCallback) {
  return dispatch => {
    let isError = false;
    dispatch({ type: types.LOGIN_START, payload: {} });
    fetch(`${config.baseUrl}api/v1/login/`,
      { method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.status >= 400) {
          isError = true;
        }
        return response.json();
      })
      .then(json => {
        if (!isError) {
          dispatch(fetchProfile(json.accountid, successCallback, errorCallback));
        } else {
          toastr.error(json.non_field_errors[0]);
          if (errorCallback) errorCallback.apply();
          dispatch({ type: types.LOGIN_ERROR, payload: {} });
        }
      });
  };
}

export function logout() {
  return {
    type: types.LOGOUT,
    payload: { isAuth: false }
  };
}

export function identity(username, successCallback) {
  return dispatch => {
    let isError = false;
    const returnObj = { type: types.IDENTITY, payload: {} };
    fetch(`https://keybase.io/_/api/1.0/user/lookup.json?username=${username}`,
      { method: 'GET' })
      .then(response => {
        if (response.status >= 400) {
          isError = true;
        }
        return response.json();
      })
      .then(json => {
        if (!isError) {
          returnObj.payload = json;
          if (successCallback) {
            successCallback.apply(null);
          }
          if (json.status.code > 0) toastr.error(json.status.desc);
          dispatch(returnObj);
        }
      });
  };
}

export function clearIdentity() {
  return {
    type: types.IDENTITY,
    payload: {}
  };
}

export function accountCreate() {
  return {
    type: types.ACCOUNT_CREATE,
    payload: { isAuth: false }
  };
}
