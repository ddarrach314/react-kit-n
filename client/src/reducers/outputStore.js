import * as types from '../actions/types';
import _ from 'lodash';

const initialState = {
  outputStore: {},
  warning: '',
  lastUpdatedBy: null
};

const outputStoreReducer = (state = initialState, action) => {
  switch (action.type) {
  case types.SET_OUTPUT_STORE:
    return {
      outputStore: action.newOutputStore,
      warning: '',
      lastUpdatedBy: action.lastUpdatedBy
    };

  case types.SET_OUTPUT_STORE_WARNING:
    state = _.cloneDeep(state);
    state.warning = action.warning;
    state.lastUpdatedBy = action.lastUpdatedBy;
    return state;

  }
  return state;
};

export default outputStoreReducer;