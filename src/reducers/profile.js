import objectAssign from 'object-assign';

import * as types from '../constants/profile';

const initialState = {
  isAuth: false,
  user: {},
  identityUser: {},
  isFetched: false
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_START:
      return objectAssign({}, state, { isFetched: true });
    case types.LOGIN_SUCCESS:
      return objectAssign({}, state, { isFetched: false });
    case types.LOGIN_ERROR:
      return objectAssign({}, state, { isFetched: false });
    case types.GET_ACCOUNT: {
      return objectAssign({}, state, { user: action.payload }, { isAuth: true }, { isFetched: false });
    }
    case types.IDENTITY: {
      const identityUser = { };
      if (action.payload.them) {
        identityUser.username = action.payload.them.basics.username;
        if (action.payload.them.pictures) {
          if (action.payload.them.pictures.primary.url) {
            identityUser.avatarPath = action.payload.them.pictures.primary.url;
          }
        } else {
          identityUser.avatarPath = 'https://keybase.io/images/no-photo/placeholder-avatar-180-x-180.png';
        }
      }
      return objectAssign({}, state, { identityUser });
    }
    case types.LOGOUT: {
      window.localStorage.removeItem('accountId');
      return objectAssign({}, state, action.payload);
    }
    default:
      return state;
  }
}

export default profileReducer;
