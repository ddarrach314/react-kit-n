import {combineReducers} from 'redux';
import outputStoreReducer from './outputStore';
import outputActionsReducer from './outputActions';

const reducer = combineReducers({
  outputStore: outputStoreReducer,
  outputActions: outputActionsReducer
});

export default reducer;