import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import profileReducer from './profile';
import historyReducer from './history';

const rootReducer = combineReducers({
  history: historyReducer,
  profile: profileReducer,
  form: formReducer
});

export default rootReducer;
