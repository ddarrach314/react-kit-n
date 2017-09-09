import _ from 'lodash';
import * as actions from '../src/actions/outputComponents';
import reducer from '../src/reducers/outputComponents';
import {
  createActionAppliers,
  ChainedActionApplier
} from '../src/utilities/testing';

const actionAppliers = createActionAppliers(actions, reducer);
const applier = new ChainedActionApplier(actions, reducer);

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

describe('Component reducer functions', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual(initialState);
  });

  test('Adds components correctly', () => {
    let [state] = applier.applyActions(
      initialState,
      {name: 'addComponent'},
      {name: 'addComponent'}
    );
    expect(_.keys(state.components).length).toBe(3);
    expect(_.keys(state.components)).not.toBe(initialState.components);
    expect(state.components[0]).toEqual(initialState.components[0]);
    expect(state.components[1])
      .toEqual({name: 'Component1', children: [], nextId: 0});
    expect(state.components[2])
      .toEqual({name: 'Component2', children: [], nextId: 0});
  });

  test('Selects components correctly', () => {
    let [state2, state1] = applier.applyActions(
      initialState,
      {name: 'addComponent'},
      {name: 'selectComponent', args: ['1']}
    );
    expect(state2).not.toBe(state1);
    expect(state2.selected).toEqual('1');
  });

  test('Updates components correctly', () => {
    let [state2, state1] = applier.applyActions(
      initialState,
      {name: 'addComponent'},
      {name: 'updateComponent', args: ['1', {name: 'test'}]}
    );

    expect(state2.components[1].name).toBe('test');
    expect(state1.components[1]).not.toBe(state2.components[1]);
    expect(state1.components[0]).toBe(state2.components[0]);
  });

  test('Removes components correctly', () => {
    let [state2, state1] = applier.applyActions(
      initialState,
      {name: 'addComponent'},
      {name: 'addComponent'},
      {name: 'removeComponent', args: ['1']}
    );

    expect(Object.keys(state2.components)).toEqual(['0', '2']);
    expect(state2.components).not.toBe(state1.components);
  });

  test('Adds child components', () => {
    let [state3, state2, state1] = applier.applyActions(
      initialState,
      {name: 'addComponent'},
      {name: 'addComponent'},
      {name: 'addChildComponent', args: [{parent: '0', child: '1'}]},
      {name: 'addChildComponent', args: [{parent: '0', child: '2'}]}
    );

    expect(state1.components[0].children).not.toBe(
      state2.components[0].children
    );
    expect(state2.components[0].children).toEqual([{componentId: '1', childId: '0'}]);
    expect(state3.components[0].children).toEqual([
      {componentId: '1', childId: '0'},
      {componentId: '2', childId: '1'}
    ]);
  });

  test('Correctly increments childId after children are removed', () => {
    let [state] = applier.applyActions(
      initialState,
      {name: 'addComponent'},
      {name: 'addChildComponent', args: [{parent: '0', child: '1'}]},
      {name: 'addChildComponent', args: [{parent: '0', child: '1'}]},
      {name: 'removeChildComponent', args: [{parent: '0', childIndex: '0'}]},
      {name: 'addChildComponent', args: [{parent: '0', child: '1'}]}
    );

    expect(state.components[0].children).toEqual([
      {childId: '1', componentId: '1'},
      {childId: '2', componentId: '1'},
    ]);
  });

  test('Removes child components', () => {
    let [state1] = applier.applyActions(
      initialState,
      {name: 'addComponent'},
      {name: 'addComponent'},
      {name: 'addChildComponent', args: [{parent: '0', child: '1'}]},
      {name: 'addChildComponent', args: [{parent: '0', child: '2'}]}
    );

    let state2 = actionAppliers.removeChildComponent(state1, {
      parent: '0',
      childIndex: 0
    });

    let state3 = actionAppliers.removeChildComponent(state1, {
      parent: '0',
      childIndex: 1
    });

    let state4 = actionAppliers.removeChildComponent(state1, {
      parent: '0',
      childIndex: 2
    });

    expect(state2.components[0].children).not.toBe(
      state1.components[0].children
    );
    expect(state2.components[0].children).toEqual([{componentId: '2', childId: '1'}]);
    expect(state3.components[0].children).toEqual([{componentId: '1', childId: '0'}]);
    expect(state4.components[0].children).toEqual([
      {componentId: '1', childId: '0'},
      {componentId: '2', childId: '1'}
    ]);
  });

  describe('Add properties to tree nodes', () => {
    let state1;

    beforeEach(() => {
      [state1] = applier.applyActions(
        initialState,
        {name: 'addComponent'},
        {name: 'addChildComponent', args: [{parent: '0', child: '1'}]}
      );
    });

    test('Toggles store connection', () => {
      let [state3, state2] = applier.applyActions(
        state1,
        {name: 'toggleComponentConnection', args: ['0_0']},
        {name: 'toggleComponentConnection', args: ['0_0']}
      );

      expect(state2.componentProps['0_0'].connected).toBe(true);
      expect(state3.componentProps['0_0'].connected).toBe(false);
    });

    test('Bind actions to component', () => {
      let [state3, state2] = applier.applyActions(
        state1,
        {name: 'toggleComponentConnection', args: ['0_0']},
        {name: 'bindActionToComponent', args: ['0_0', '0']},
        {name: 'bindActionToComponent', args: ['0_0', '0']},
        {name: 'bindActionToComponent', args: ['0_0', '1']}
      );

      expect(state3.componentProps['0_0'].actions).toEqual({'0': '0', '1': '1'});
      expect(state3.componentProps['0_0'].connected).toBe(true);
      expect(state2.componentProps['0_0'].actions).toEqual({'0': '0'});
    });

    test('Removes actions from component', () => {
      let [state3, state2] = applier.applyActions(
        state1,
        {name: 'toggleComponentConnection', args: ['0_0']},
        {name: 'bindActionToComponent', args: ['0_0', '0']},
        {name: 'bindActionToComponent', args: ['0_0', '1']},
        {name: 'removeActionFromComponent', args: ['0_0', '0']}
      );

      expect(state3.componentProps['0_0'].connected).toBe(true);
      expect(state3.componentProps['0_0'].actions).toEqual(
        {'1': '1'}
      );
      expect(state2.componentProps['0_0'].actions).toEqual({
        '0': '0',
        '1': '1'
      });
    });

    test('Bind store props to component', () => {
      let [state3, state2] = applier.applyActions(
        state1,
        {name: 'toggleComponentConnection', args: ['0_0']},
        {name: 'bindStorePropToComponent', args: ['0_0', 'prop1']},
        {name: 'bindStorePropToComponent', args: ['0_0', 'prop1']},
        {name: 'bindStorePropToComponent', args: ['0_0', 'prop1.prop2']}
      );

      expect(state3.componentProps['0_0'].connected).toBe(true);
      expect(state3.componentProps['0_0'].storeProps).toEqual({
        'prop1': 'prop1',
        'prop1.prop2': 'prop1.prop2'
      });
      expect(state2.componentProps['0_0'].storeProps).toEqual({
        'prop1': 'prop1'
      });
    });

    test('Removes actions from component', () => {
      let [state3, state2] = applier.applyActions(
        state1,
        {name: 'toggleComponentConnection', args: ['0_0']},
        {name: 'bindStorePropToComponent', args: ['0_0', 'prop1']},
        {name: 'bindStorePropToComponent', args: ['0_0', 'prop1.prop2']},
        {name: 'removeStorePropFromComponent', args: ['0_0', 'prop1']}
      );

      expect(state3.componentProps['0_0'].connected).toBe(true);
      expect(state3.componentProps['0_0'].storeProps).toEqual({
        'prop1.prop2': 'prop1.prop2'
      });
      expect(state2.componentProps['0_0'].storeProps).toEqual({
        'prop1': 'prop1',
        'prop1.prop2': 'prop1.prop2'
      });
    });

  });

});
