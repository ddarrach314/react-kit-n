import * as types from './types';

export const createNewOutputAction = (outputAction) => (
  {
    type: types.CREATE_NEW_OUTPUT_ACTION,
    outputAction
  }
);

export const editOutputAction = (index, outputAction) => (
  {
    type: types.EDIT_OUTPUT_ACTION,
    index,
    outputAction
  }
);

export const removeOutputAction = (index) => (
  {
    type: types.REMOVE_OUTPUT_ACTION,
    index
  }
);

export const toggleEditActionModal = (index) => (
  {
    type: types.TOGGLE_EDIT_ACTION_MODAL,
    index
  }
);

export const updateActionsForRemovedTarget = (target) => (
  {
    type: types.UPDATE_ACTIONS_FOR_REMOVED_TARGET,
    target
  }
);