import * as types from './types';

export const selectComponent = (id) => ({
  type: types.SELECT_COMPONENT,
  id
});

export const addComponent = () => ({
  type: types.ADD_COMPONENT
});

export const updateComponent = (id, update) => ({
  type: types.UPDATE_COMPONENT,
  id: id,
  update: update
});

export const removeComponent = (id) => ({
  type: types.REMOVE_COMPONENT,
  id
});

export const specifyChildComponent = ({parent, child}) => ({
  type: types.SPECIFY_CHILD_COMPONENT,
  parent,
  child
});
