import * as types from './types';

export const createNewOutputAction = () => (
  {type: types.CREATE_NEW_OUTPUT_ACTION}
);

export const editOutputActionType = (index, newType) => (
  {
    type: types.EDIT_OUTPUT_ACTION_TYPE,
    index,
    newType
  }
);

export const editOutputActionName = (index, newName) => (
  {
    type: types.EDIT_OUTPUT_ACTION_NAME,
    index,
    newName
  }
);

export const editOutputActionTarget = (index, newTarget) => (
  {
    type: types.EDIT_OUTPUT_ACTION_TARGET,
    index,
    newTarget
  }
);

export const editOutputActionValid = (index, newValid) => (
  {
    type: types.EDIT_OUTPUT_ACTION_TARGET,
    index,
    newValid
  }
);

export const removeOutputAction = (index) => (
  {
    type: types.REMOVE_OUTPUT_ACTION,
    index
  }
);