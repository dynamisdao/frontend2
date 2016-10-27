import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

import * as types from '../constants/policy';
import config from '../config';
import { getHeaders } from '../utils';
import { urls } from '../routes';

const toastr = window.toastr;
const lightwallet = window.lightwallet;

export function getPolicy(policyid, successCallback) {
  return dispatch => {
    let isError = false;
    fetch(`${config.baseUrl}api/v1/policies/${policyid}/`,
      { method: 'GET' })
      .then(response => {
        if (response.status >= 400) {
          isError = true;
        }
        return response.json();
      })
      .then(json => {
        if (!isError) {
          dispatch({ type: types.POLICY_GET, payload: json });
          if (successCallback) {
            successCallback.apply();
          }
          if (json.is_signed) {
            browserHistory.push(urls.main.policy.path);
          } else {
            browserHistory.push(urls.details.path);
          }
        }
      });
  };
}

export function getDepositInfo(policyid) {
  return dispatch => {
    let isError = false;
    fetch(`${config.baseUrl}api/v1/policies/${policyid}/smart_deposit`,
      { method: 'GET',
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
          dispatch({ type: types.POLICY_SMARTDEPOSIT_INFO_GET, payload: json });
        }
      });
  };
}

export function getReviesTasks() {
  return dispatch => {
    let isError = false;
    fetch(`${config.baseUrl}api/v1/review-tasks/`,
      { method: 'GET',
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
          dispatch({ type: types.REVIEW_TASKS_GET, payload: json });
        }
      });
  };
}

export function getReviesTask(id) {
  return dispatch => {
    let isError = false;
    fetch(`${config.baseUrl}api/v1/review-tasks/${id}/`,
      { method: 'GET',
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
          dispatch({ type: types.REVIEW_TASK_GET, payload: json });
        }
      });
  };
}

export function signReviesTask(id, data) {
  return dispatch => {
    let isError = false;
    dispatch({ type: types.REVIEW_TASK_SIGN_START });
    fetch(`${config.baseUrl}api/v1/review-tasks/${id}/verify/`,
      { method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
        credentials: 'include'
      })
      .then(response => {
        if (response.status >= 400) {
          isError = true;
          dispatch({ type: types.REVIEW_TASK_SIGN_ERROR });
        } else {
          toastr.success('Task signed');
          dispatch({ type: types.REVIEW_TASK_SIGN_SUCCESS, payload: id });
        }
        return response.json();
      })
      .then(json => {
        if (isError) {
          toastr.error(json.non_field_errors[0]);
        }
      });
  };
}

export function changePoolState(values) {
  return {
    type: types.POOL_STATE_CHANGE,
    payload: { state: values }
  };
}

export function openWallet() {
  return {
    type: types.WALLET_OPEN
  };
}

export function saveKeystore(keystore) {
  window.localStorage.keystore = keystore.serialize();
}

export function readKeystoreFromLocalstorage() {
  return lightwallet.keystore.deserialize(window.localStorage.keystore);
}

export function generateNewWallet(password, successCallback) {
  const secretSeed = lightwallet.keystore.generateRandomSeed();
  return dispatch => {
    lightwallet.keystore.deriveKeyFromPassword(password, (err, pwDerivedKey) => {
      if (err) throw err;
      const keystore = new lightwallet.keystore(secretSeed, pwDerivedKey);
      keystore.generateNewAddress(pwDerivedKey);

      saveKeystore(keystore);
      const address = keystore.getAddresses()[0];
      dispatch({
        type: types.WALLET_NEW_GENERATE,
        payload: address
      });
      if (successCallback) successCallback.apply();
      toastr.success('New wallet generated');
    });
  };
}
