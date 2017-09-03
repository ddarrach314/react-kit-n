import * as types from '../actions/types';
import _ from 'lodash';

const initialState = {
  outputActions: [],
  nextId: 1
};

const outputActionsReducer = (state = initialState, action) => {
  switch (action.type) {
  case types.CREATE_NEW_OUTPUT_ACTION:
    let nextId = state.nextId + 1;
    let outputActions = [...state.outputActions, {
      id: nextId,
      name: '',
      type: '',
      target: '',
      valid: false
    }];
    return {outputActions, nextId};
        
  case types.EDIT_OUTPUT_ACTION_TYPE:
    state = _.cloneDeep(state);
    state.outputActions[action.index].type = action.newType;
    return state;

  case types.EDIT_OUTPUT_ACTION_NAME:
    state = _.cloneDeep(state);
    state.outputActions[action.index].name = action.newName;
    return state;

  case types.EDIT_OUTPUT_ACTION_TARGET:
    state = _.cloneDeep(state);
    state.outputActions[action.index].target = action.newTarget;
    state.outputActions[action.index].type = '';
    return state;

  case types.EDIT_OUTPUT_ACTION_VALID:
    state = _.cloneDeep(state);
    state.outputActions[action.index].valid = action.newValid;
    return state;

  case types.REMOVE_OUTPUT_ACTION:
    state = _.cloneDeep(state);
    state.outputActions.splice(action.index, 1);
    return state;

  }
  return state;
};

export default outputActionsReducer;