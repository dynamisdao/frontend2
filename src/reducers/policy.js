import objectAssign from 'object-assign';

import * as types from '../constants/policy';

const initialState = {
  policy: {}
};

function policyReducer(state = initialState, action) {
  switch (action.type) {
    case types.POLICY_GET:
      return objectAssign({}, state, { policy: action.payload });
    default:
      return state;
  }
}

export default policyReducer;
