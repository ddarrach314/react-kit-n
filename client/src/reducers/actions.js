import * as types from '../actions/types';
import _ from 'lodash';

const initialState = {
  actions: [],
  editing: null,
  nextId: 1
};

const actionsReducer = (state = initialState, action) => {
  switch (action.type) {
  case types.INITIATE_NEW_ACTION:
    return Object.assign({
      editing: {
        id: ++state.nextId,
        name: '',
        type: '',
        target: ''
      }
    }, state);

  case types.SAVE_ACTION:
    state = _.cloneDeep(state);
    return state;
  case types.ENTER_EDITING:
    state = _.cloneDeep(state);
    return state;
  case types.EXIT_EDITING:
    state = _.cloneDeep(state);
    return state;
  case types.EDIT_ACTION_TYPE:
    state = _.cloneDeep(state);
    return state;
  case types.EDIT_ACTION_NAME:
    state = _.cloneDeep(state);
    return state;
  case types.EDIT_ACTION_TARGET:
    state = _.cloneDeep(state);
    return state;
  case types.REMOVE_ACTION:
    state = _.cloneDeep(state);
    return state;
  }
  return state;
};

export default storeReducer;
