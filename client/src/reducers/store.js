import * as types from '../actions/types';
import _ from 'lodash';

const initialState = {
  store: {},
  warning: '',
  lastUpdatedBy: null
};

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
  case types.SET_STORE:
    return {
      store: action.newStore,
      warning: '',
      lastUpdatedBy: action.lastUpdatedBy
    };

  case types.SET_STORE_WARNING:
    state = _.cloneDeep(state);
    state.warning = action.warning;
    return state;

  }
  return state;
};

export default storeReducer;