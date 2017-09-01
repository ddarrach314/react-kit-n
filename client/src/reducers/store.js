import {types} from '../actions';
import _ from 'lodash';

const initialState = {
  store: {},
  warning: '',
  lastUpdatedBy: null
};

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
  case types.SET_STORE:
    state = _.cloneDeep(state);
    state.store = action.newStore;
    state.lastUpdatedBy = action.lastUpdatedBy;
    return state;
  case types.SET_STORE_WARNING:
    state = _.cloneDeep(state);
    state.warning = action.warning;
    return state;
  }
  return state;
};

export default storeReducer;