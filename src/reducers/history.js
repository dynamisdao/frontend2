import objectAssign from 'object-assign';

import * as types from '../constants/history';

const initialState = {
  positionList: [],
  policyId: undefined
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_POSITION: {
      const positionList = state.positionList;
      positionList.push(action.payload.values);
      return objectAssign({}, state, positionList);
    }
    case types.DELETE_POSITION: {
      const editPositionList = state.positionList;
      const index = editPositionList.indexOf(editPositionList.find(p => p.id === action.payload.id));
      editPositionList.splice(index, 1);
      return objectAssign({}, state, { positionList: editPositionList });
    }
    case types.CREATE_POLICY: {
      debugger
      return objectAssign({}, state, { policyId: json });
    }
    default:
      return state;
  }
}

export default profileReducer;
