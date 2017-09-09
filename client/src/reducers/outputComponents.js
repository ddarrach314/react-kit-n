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

      newState = makeMutableCopy(state, 'components');
      newState.components = _.cloneDeep(newState.components);
      delete newState.components[action.id];
      for (var component of Object.values(newState.components)) {
        for (var index = component.children.length - 1; index >= 0; index--) {
          component.children[index].componentId === action.id && component.children.splice(index, 1);
        }
      }
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

    case types.BIND_ACTION_TO_COMPONENT: {
      let {outputPropsKey, outputAction} = action;
      newState = makeMutableCopy(
        state,
        `componentProps.${outputPropsKey}.actions.${outputAction}`
      );

      newState.componentProps[outputPropsKey] =
        newState.componentProps[outputPropsKey] || {};

      newState.componentProps[outputPropsKey].actions =
        newState.componentProps[outputPropsKey].actions || {};

      newState.componentProps[outputPropsKey].actions[outputAction] = outputAction;

      return newState;
    }

    case types.REMOVE_ACTION_FROM_COMPONENT: {
      let {outputPropsKey, outputAction} = action;
      if (
        !state.componentProps[outputPropsKey] ||
        !state.componentProps[outputPropsKey].actions
      ) {
        return state;
      }

      newState = makeMutableCopy(
        state,
        `componentProps.${outputPropsKey}.actions.${outputAction}`
      );

      delete newState.componentProps[outputPropsKey].actions[outputAction];
      return newState;
    }

    case types.BIND_STORE_PROP_TO_COMPONENT: {
      let {outputPropsKey, outputStoreProp, outputStorePropName} = action;

      newState = makeMutableCopy (
        state,
        `componentProps.${outputPropsKey}.storeProps.${outputStoreProp}`
      );

      newState.componentProps[outputPropsKey] =
        newState.componentProps[outputPropsKey] || {};

      newState.componentProps[outputPropsKey].storeProps =
        newState.componentProps[outputPropsKey].storeProps || {};

      newState.componentProps[outputPropsKey].storeProps[outputStoreProp] =
        outputStorePropName;

      return newState;
    }

    case types.REMOVE_STORE_PROP_FROM_COMPONENT: {
      let {outputPropsKey, outputStoreProp} = action;
      if (
        !state.componentProps[outputPropsKey] ||
        !state.componentProps[outputPropsKey].storeProps
      ) {
        return state;
      }

      newState = makeMutableCopy(
        state,
        `componentProps.${outputPropsKey}.storeProps.${outputStoreProp}`
      );

      delete newState.componentProps[outputPropsKey].storeProps[outputStoreProp];
      return newState;
    }

    }
  } catch (err) {
    console.log(err);
  }

  return state;
};

export default outputComponentsReducer;
