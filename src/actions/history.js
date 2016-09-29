import fetch from 'isomorphic-fetch';
import * as types from '../constants/history';
import config from '../config';
import { getHeaders } from '../utils';

export function addPosition(values) {
  return {
    type: types.ADD_POSITION,
    payload: { values }
  };
}

export function deletePosition(id) {
  return {
    type: types.DELETE_POSITION,
    payload: { id }
  };
}

export function updatePolicy(policyid, data) {
  return dispatch => {
    let isError = false;
    fetch(`${config.baseUrl}api/v1/policies/${policyid}/`,
      { method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
        credentials: 'include'
      })
      .then(response => {
        if (response.status >= 400) {
          isError = true;
        }
        return response.json();
      })
      .then(json => {
        if (!isError) {
          dispatch({ type: types.UPDATE_POLICY, payload: json });
        }
      });
  };
}

export function createPolicy(data) {
  return dispatch => {
    debugger
    let isError = false;
    fetch(`${config.baseUrl}api/v1/policies/`,
      { method: 'POST',
        headers: getHeaders(),
        credentials: 'include'
      })
      .then(response => {
        if (response.status >= 400) {
          isError = true;
        }
        return response.json();
      })
      .then(json => {
        if (!isError) {
          dispatch({ type: types.CREATE_POLICY, payload: json });
          dispatch(updatePolicy(json, data));
        }
      });
  };
}
