import objectAssign from 'object-assign';

import * as types from '../constants/policy';

const initialState = {
  policy: {},
  depositInfo: {},
  poolState: { state: 'init' },
  walletIsOpen: false
};

function policyReducer(state = initialState, action) {
  switch (action.type) {
    case types.POLICY_GET:
      return objectAssign({}, state, { policy: action.payload });
    case types.POLICY_SMARTDEPOSIT_INFO_GET:
      return objectAssign({}, state, { depositInfo: action.payload });
    case types.REVIEW_TASKS_GET:
      return objectAssign({}, state, { reviewTasks: action.payload.results });
    case types.POOL_STATE_CHANGE:
      return objectAssign({}, state, { poolState: action.payload });
    case types.REVIEW_TASK_GET: {
      const poolState = {
        state: 'reviewTask',
        reviewTask: action.payload
      };
      return objectAssign({}, state, { poolState });
    }
    case types.WALLET_OPEN: {
      const poolState = { state: 'init' };
      if (!state.walletIsOpen) poolState.state = 'wallet';
      return objectAssign({}, state, { walletIsOpen: !state.walletIsOpen }, { poolState });
    }
    case types.WALLET_NEW_GENERATE:
      return objectAssign({}, state);
    default:
      return state;
  }
}

export default policyReducer;
