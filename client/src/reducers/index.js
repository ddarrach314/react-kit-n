import { combineReducers } from 'redux';
import { LOAD } from 'redux-storage';
import utils from '../utilities';
import outputStoreReducer from './outputStore';
import outputActionsReducer from './outputActions';
import outputComponentsReducer from './outputComponents';

const reducer = combineReducers({
  outputStore: outputStoreReducer,
  outputActions: outputActionsReducer,
  outputComponents: outputComponentsReducer
});

const loadReducer = (state, action) => {
  if (action.type === LOAD) {
    console.log(action.payload);
    return Object.assign({}, state, action.payload);
  } else {
    return state;
  }
};

export default utils.applyReducersSequentially(
  reducer,
  loadReducer
);
