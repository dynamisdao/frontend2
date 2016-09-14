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
