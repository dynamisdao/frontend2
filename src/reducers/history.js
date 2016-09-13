import objectAssign from 'object-assign';

import { ADD_POSITION } from '../constants/history';

const initialState = {
  positionList: []
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POSITION: {
      const positionList = state.positionList;
      positionList.push(action.payload.values);
      return objectAssign({}, state, positionList);
    }
    default:
      return state;
  }
}

export default profileReducer;
