import objectAssign from 'object-assign';

import { LOGIN, IDENTITY } from '../constants/profile';

const initialState = {
  isAuth: false,
  user: {},
  identityUser: {},
  isFetched: false
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return objectAssign({}, state, action.payload);
    case IDENTITY: {
      const identityUser = { };
      if (action.payload.them) {
        identityUser.username = action.payload.them.basics.username;
        if (action.payload.them.pictures.primary.url) {
          identityUser.avatarPath = action.payload.them.pictures.primary.url;
        } else {
          identityUser.avatarPath = 'https://keybase.io/images/no-photo/placeholder-avatar-180-x-180.png';
        }
      }
      return objectAssign({}, state, { identityUser });
    }
    default:
      return state;
  }
}

export default profileReducer;
