import * as types from '../actions/types';
import utils from '../utilities';
import _ from 'lodash';

const { makeMutableCopy } = utils;

const initialState = {
  selected: '0',
  nextId: 1,
  components: {
    0: {
      name: 'App',
      children: [],
      nextId: 0
    }
  },
  componentProps: {}
};

const outputComponentsReducer = (state = initialState, action = {}) => {
  let newState;

  try {
    switch (action.type) {
    case types.SELECT_COMPONENT:
      if (action.id in state.components) {
        return _.assign({}, state, {selected: action.id});
      } else {
        throw 'The component id you passed does not exist in state.components.';
      }

    case types.ADD_COMPONENT:
      newState = makeMutableCopy(state, 'components.0', 'nextId');
      newState.components[state.nextId] = {
        name: `Component${state.nextId}`,
        children: [],
        nextId: 0
      };
      newState.nextId += 1;
      return newState;

    case types.UPDATE_COMPONENT:
      newState = makeMutableCopy(state, `components.${action.id}`);
      newState.components[action.id] = _.assign(
        {},
        newState.components[action.id],
        action.update
      );
      return newState;

    case types.REMOVE_COMPONENT:
      if (action.id === '0') {
        throw 'You may not remove initial app component.';
      }
      newState = makeMutableCopy(state, `components.${action.id}`);
      delete newState.components[action.id];
      return newState;

    case types.ADD_CHILD_COMPONENT:
      if (action.parent in state.components[action.child]) {
        throw 'You may not add a child to a parent if the child has the parent as a child';
      } else if (action.parent === action.child) {
        throw 'You may not a component to itself as a child';
      } else if (!(action.parent in state.components)) {
        throw 'The specified parent id does not exist';
      } else if (!(action.child in state.components)) {
        throw 'The specified child id does not exist';
      }

      let newState = makeMutableCopy(
        state,
        `components.${action.parent}.children.0`
      );

      newState.components[action.parent].children.push({
        componentId: action.child,
        childId: newState.components[action.parent].nextId.toString()
      });

      newState.components[action.parent].nextId += 1;
      return newState;

    case types.REMOVE_CHILD_COMPONENT:
      if (!(action.parent in state.components)) {
        throw 'The specified parent id does not exist';
      }

      newState = makeMutableCopy(
        state,
        `components.${action.parent}.children.${action.childIndex}`
      );

      newState.components[action.parent].children.splice(action.childIndex, 1);
      return newState;

    case types.TOGGLE_COMPONENT_CONNECTION:
      newState = makeMutableCopy(
        state,
        `componentProps.${action.outputPropsKey}`
      );

      let connected = (
        state.componentProps[action.outputPropsKey] &&
        state.componentProps[action.outputPropsKey].connected
      );

      newState.componentProps[action.outputPropsKey] = _.assign(
        {},
        state.componentProps[action.outputPropsKey],
        {connected: !connected}
      );

      return newState;

    case types.BIND_ACTION_TO_COMPONENT:
      newState = makeMutableCopy(
        state,
        `componentProps.${action.outputPropsKey}`
      );

      newState.componentProps[action.outputPropsKey] = _.assign(
        {actions: []},
        state.componentProps[action.outputPropsKey]
      );

      let actions = newState.componentProps[action.outputPropsKey].actions;

      if (actions.indexOf(action.outputAction) > -1) {
        return state;
      }

      newState = makeMutableCopy(
        newState,
        `componentProps.${action.outputPropsKey}.actions`
      );

      newState.componentProps[action.outputPropsKey].actions = [
        ...actions,
        action.outputAction
      ];

      return newState;

    case types.BIND_STORE_PROP_TO_COMPONENT:
      newState = makeMutableCopy(
        state,
        `componentProps.${action.outputPropsKey}`
      );

      newState.componentProps[action.outputPropsKey] = _.assign(
        {storeProps: []},
        state.componentProps[action.outputPropsKey]
      );

      let storeProps = newState.componentProps[action.outputPropsKey].storeProps;
      if (storeProps.indexOf(action.outputStoreProp) > -1) {
        return state;
      }

      newState = makeMutableCopy(
        newState,
        `componentProps.${action.outputPropsKey}.storeProps`
      );

      newState.componentProps[action.outputPropsKey].storeProps = [
        ...storeProps,
        action.outputStoreProp
      ];

      return newState;

    }
  } catch (err) {
    console.log(err); 
  }

  return state;
};

export default outputComponentsReducer;
