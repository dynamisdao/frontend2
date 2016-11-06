import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

import * as types from '../constants/policy';
import config from '../config';
import { getHeaders } from '../utils';
import { urls } from '../routes';
import {
  getBalance,
  getTransactionCount,
  sendRawTransaction,
  getTransactionReceipt,
  getFirstBlockHash
} from './web3';

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

export function getSmartDeposit(policyid) {
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
          dispatch({ type: types.POLICY_SMART_DEPOSIT_INFO_GET, payload: json });
        }
      });
  };
}

export function sendSmartDeposit(policyid, data) {
  return dispatch => {
    fetch(`${config.baseUrl}api/v1/policies/${policyid}/smart_deposit/send`,
      { method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
        credentials: 'include'
      })
      .then(response => {
        if (response.status >= 400) {
          toastr.error('Transaction failed');
        } else {
          dispatch({ type: types.POLICY_SMART_DEPOSIT_INFO_SEND });
        }
      });
  };
}

export function getReviewTasks() {
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

export function getReviewTask(id) {
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

export function signReviewTask(id, data) {
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
          browserHistory.push(urls.main.policy.path);
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

export function saveKeystore(keystore) {
  window.localStorage.keystore = keystore.serialize();
}

export function readKeystoreFromLocalstorage() {
  return lightwallet.keystore.deserialize(window.localStorage.keystore);
}

export function openWallet() {
  return {
    type: types.WALLET_OPEN
  };
}


export function getWallet() {
  return dispatch => {
    const address = readKeystoreFromLocalstorage().getAddresses()[0];
    if (address) {
      getBalance(config.ETHEREUM_NODE, address, (signErr, balance) => {
        const wallet = { address, balance };
        dispatch({
          type: types.WALLET_GET, payload: wallet
        });
      });
    }
  }
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
      dispatch(getWallet());
    });
  };
}

export function makeTransaction(data, password, policyId, successCallback) {
  return dispatch => {
    lightwallet.keystore.deriveKeyFromPassword(password, (err, pwDerivedKey) => {
      const store = readKeystoreFromLocalstorage();
      const address = store.getAddresses()[0];
      getTransactionCount(config.ETHEREUM_NODE, address, (errorr, nonce) => {
        const tx = lightwallet.txutils.valueTx({
          to: data.from_address,
          gasPrice: 20000000000,
          gasLimit: 30000,
          value: data.amount_in_wei,
          nonce
        });
        const signed = lightwallet.signing.signTx(
          store,
          pwDerivedKey,
          tx,
          address,
          store.defaultHdPathString
        );
        sendRawTransaction(config.ETHEREUM_NODE, signed, (signErr, hash) => {
          if (signErr) {
            toastr.error(signErr);
          } else {
            // eslint-disable-next-line no-console
            console.log(hash);
            dispatch({
              type: types.TRANSACTION_SEND_SUCCESS, payload: hash
            });
            successCallback.apply();
          }
        });
      });
    });
  };
}

export function readWallet(json) {
  return function(dispatch, getState) {
    var keystore = lightwallet.keystore.deserialize(json);
    saveKeystore(keystore);
    dispatch(getWallet());
    toastr.success('Wallet uploaded');
  };
}

