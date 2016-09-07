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
        identityUser.avatarPath = action.payload.them.pictures.primary.url;
      } else {
        identityUser.avatarPath = 'https://keybase.io/images/no-photo/placeholder-avatar-180-x-180.png';
      }
      identityUser.username = action.payload.them.basics.username;
      return objectAssign({}, state, { identityUser });
    }
    default:
      return state;
  }
}

export default profileReducer;
