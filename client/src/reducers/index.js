import {combineReducers} from 'redux';
import storeReducer from './store';

const reducer = combineReducers({storeReducer});

export default reducer;