import * as types from '../actions/types';
import _ from 'lodash';
import utils from '../utilities';

const initialState = {
  properties: [],
  warning: '',
  lastUpdatedBy: null
};

const outputStoreReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  /*
  case types.SET_OUTPUT_STORE:
    console.log(1);
    return {
      outputStore: action.newOutputStore,
      warning: '',
      lastUpdatedBy: action.lastUpdatedBy
    };
  */

  case types.SET_OUTPUT_STORE_PROPERTY: {
    if (
      action.property.type === 'Object' &&
      !('properties' in action.property)
    ) {
      action.property.properties = [];
    }

    if (
      action.property.type === 'Array' &&
      !('elementSchema' in action.property)
    ) {
      action.property.elementSchema = {};
    }

    let pathString = utils.outputStore.buildPropertiesPath(action.path);
    return utils.safeSet(state, action.property, pathString);
  }

  case types.REMOVE_OUTPUT_STORE_PROPERTY: {
    let pathString = utils.outputStore.buildPropertiesPath(action.path);
    return utils.safeDelete(state, pathString);
  }

  /*
  case types.SET_OUTPUT_STORE_WARNING:
    console.log(4);
    state = _.cloneDeep(state);
    state.warning = action.warning;
    state.lastUpdatedBy = action.lastUpdatedBy;
    return state;
  */

  }

  return state;
};

export default outputStoreReducer;
