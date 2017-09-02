import {combineReducers} from 'redux';
import outputStoreReducer from './outputStore';
import outputActionsReducer from './outputActions';

const reducer = combineReducers({outputStoreReducer, outputActionsReducer});

export default reducer;