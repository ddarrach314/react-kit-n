import {combineReducers} from 'redux';
import outputStoreReducer from './outputStore';
import outputActionsReducer from './outputActions';
import outputComponentsReducer from './outputActions';

const reducer = combineReducers({
  outputStore: outputStoreReducer,
  outputActions: outputActionsReducer,
  outputComponents: outputComponentsReducer
});

export default reducer;
