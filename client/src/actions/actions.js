import * as types from './types';

export const initiateNewAction = () => {
  type: types.INITIATE_NEW_ACTION;
};

export const saveAction = () => {
  type: types.SAVE_ACTION;
};

export const enterEditing = (index) => {
  {
    type: types.ENTER_EDITING,
    index;
  }
  // changing the store will invalidate actions if their target is removed or changed
};

export const exitEditing = () => (
  {
    type: types.EXIT_EDITING,
  }
);

export const editActionType = (newType) => (
  {
    type: types.EDIT_ACTION_TYPE,
    newType
  }
);

export const editActionName = (newName) => (
  {
    type: types.EDIT_ACTION_NAME,
    newName
  }
);

export const editActionTarget = (newTarget) => (
  {
    type: types.EDIT_ACTION_TARGET,
    newTarget
  }
);

export const removeAction = (index) => (
  {
    type: types.REMOVE_ACTION,
    index
  }
);