import * as types from '../actions/types';
import _ from 'lodash';
import utils from '../utilities';

const initialState = {
  outputActions: [],
  nextId: 1,
  editing: null
};

const outputActionsReducer = (state = initialState, action) => {
  switch (action.type) {
  case types.CREATE_NEW_OUTPUT_ACTION:
    let nextId = state.nextId + 1;
    state = utils.safeSet(state, nextId, 'nextId');
    action.outputAction.id = state.nextId;
    state = utils.safeSet(state, [action.outputAction, ...state.outputActions], 'outputActions');
    return state;
        
  case types.EDIT_OUTPUT_ACTION:
    return utils.safeSet(state, action.outputAction, `outputActions.${action.index}`);

  case types.REMOVE_OUTPUT_ACTION:
    return utils.safeDelete(state, `outputActions.${action.index}`);

  case types.TOGGLE_EDIT_ACTION_MODAL:
    if (state.editing) {
      state = utils.safeSet(state, null, 'editing');

    } else {
      state = utils.safeSet(state, {index: action.index, action: state.outputActions[action.index] || {}}, 'editing');
    }

    return state;

  }
  return state;
};

export default outputActionsReducer;