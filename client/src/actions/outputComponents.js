import * as types from './types';

export const selectComponent = (id) => ({
  type: types.SELECT_COMPONENT,
  id: id.toString()
});

export const addComponent = () => ({
  type: types.ADD_COMPONENT
});

export const updateComponent = (id, update) => ({
  type: types.UPDATE_COMPONENT,
  id: id.toString(),
  update: update
});

export const removeComponent = (id) => ({
  type: types.REMOVE_COMPONENT,
  id: id.toString()
});

export const addChildComponent = ({parent, child}) => ({
  type: types.ADD_CHILD_COMPONENT,
  parent: parent.toString(),
  child: child.toString()
});

export const removeChildComponent = ({parent, childIndex}) => ({
  type: types.REMOVE_CHILD_COMPONENT,
  parent: parent.toString(),
  childIndex
});
