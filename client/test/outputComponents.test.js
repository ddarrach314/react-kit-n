import _ from 'lodash';
import * as actions from '../src/actions/outputComponents';
import reducer from '../src/reducers/outputComponents';
import { createActionAppliers } from '../src/utilities/testing';

const actionAppliers = createActionAppliers(actions, reducer);

const initialState = {
  selected: '0',
  nextId: 1,
  components: {
    0: {
      name: 'App',
      children: []
    }
  }
};

describe('Component reducer functions', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual(initialState);
  });

  test('Adds components correctly', () => {
    let state = actionAppliers.addComponent(initialState);
    state = actionAppliers.addComponent(state);
    expect(_.keys(state.components).length).toBe(3);
    expect(_.keys(state.components)).not.toBe(initialState.components);
    expect(state.components[0]).toEqual(initialState.components[0]);
    expect(state.components[1])
      .toEqual({name: 'Component1', children: []});
    expect(state.components[2])
      .toEqual({name: 'Component2', children: []});
  });

  test('Updates components correctly', () => {
    let state1 = actionAppliers.addComponent(initialState);
    let state2 = actionAppliers.updateComponent(state1, 1, {name: 'test'});

    expect(state2.components[1].name).toBe('test');
    expect(state1.components[1]).not.toBe(state2.components[1]);
    expect(state1.components[0]).toBe(state2.components[0]);
  });

  test('Removes components correctly', () => {
    let state1 = actionAppliers.addComponent(initialState);
    state1 = actionAppliers.addComponent(state1);
    let state2 = actionAppliers.removeComponent(state1, '1');
    expect(keys(state2.components)).toEqual(['0', '2']);
  });
});
