import fetch from 'isomorphic-fetch';
import * as types from '../constants/profile';
import config from '../config';
import { getHeaders } from '../utils';

const toastr = window.toastr;

export function login(data, successCallback, errorCallback) {
  return dispatch => {
    let isError = false;
    const returnObj = { type: types.LOGIN, payload: {} };
    fetch(`${config.baseUrl}/api/v1/login/`,
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
          returnObj.payload.isAuth = true;
          if (successCallback) {
            successCallback.apply();
          }
        } else {
          returnObj.payload.isAuth = false;
          toastr.error(json.non_field_errors[0]);
          if (errorCallback) {
            errorCallback.apply();
          }
        }
        dispatch(returnObj);
      });
  };
}

export function logout() {
  return {
    type: types.LOGOUT,
    data: { isAuth: false }
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

export function accountCreate() {
  return {
    type: types.ACCOUNT_CREATE,
    data: { isAuth: false }
  };
}
