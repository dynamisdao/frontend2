import objectAssign from 'object-assign';

import * as types from '../constants/policy';

const initialState = {
  isFetched: false,
  policy: {},
  smartDeposit: {},
  poolState: { state: 'init' },
  walletIsOpen: false,
    wallet: {},
  newGenerateWallet: false
};

function policyReducer(state = initialState, action) {
  switch (action.type) {
    case types.POLICY_GET:
      return objectAssign({}, state, { policy: action.payload });
    case types.POLICY_SMART_DEPOSIT_INFO_GET:
      return objectAssign({}, state, { smartDeposit: action.payload });
    case types.POLICY_SMART_DEPOSIT_INFO_SEND: {
      const smartDeposit = state.smartDeposit;
      smartDeposit.status = 1;
      return objectAssign({}, state, { smartDeposit });
    }
    case types.TRANSACTION_SEND_SUCCESS: {
        const smartDeposit = state.smartDeposit;
        smartDeposit.hash = action.payload;
        return objectAssign({}, state, { smartDeposit });
    }
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
    case types.REVIEW_TASK_SIGN_START:
      return objectAssign({}, state, { isFetched: true });
    case types.REVIEW_TASK_SIGN_SUCCESS: {
      const poolState = {
        state: 'init'
      };
      const reviewTasks = state.reviewTasks;
      const index = reviewTasks.indexOf(reviewTasks.find(task => task.id === action.payload));
      reviewTasks.splice(index, 1);
      return objectAssign({}, state, { isFetched: false }, { poolState }, { reviewTasks });
    }
    case types.REVIEW_TASK_SIGN_ERROR:
      return objectAssign({}, state, { isFetched: false });
    case types.WALLET_OPEN: {
      const poolState = { state: 'init' };
      if (!state.walletIsOpen) poolState.state = 'wallet';
      return objectAssign({}, state, { walletIsOpen: !state.walletIsOpen }, { poolState });
    }
    case types.WALLET_GET:
        return objectAssign({}, state, { wallet: action.payload });
    case types.WALLET_NEW_GENERATE:
      return objectAssign({}, state, { newGenerateWallet: true });
    default:
      return state;
  }
}

export default policyReducer;
