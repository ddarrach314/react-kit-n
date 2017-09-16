import _ from 'lodash';
import * as actions from '../src/actions/outputActions';
import reducer from '../src/reducers/outputActions';
import {
  createActionAppliers,
  ChainedActionApplier
} from '../src/utilities/testing';

const actionAppliers = createActionAppliers(actions, reducer);
const applier = new ChainedActionApplier(actions, reducer);

const initialState = {
  outputActions: [],
  nextId: 1,
  editing: null
};

describe('Actions reducer function', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual(initialState);
  });

  let addPropertyActions = [
    {name: 'createNewOutputAction', args: [{name: 'editListItem', target: 'list.listItem', type: undefined}]},
    {name: 'createNewOutputAction', args: [{name: 'editListItem', target: undefined, type: 'setIn'}]}
  ];

  test('Adds actions correctly', () => {
    let [state2, state1] = applier.applyActions(
      initialState,
      ...addPropertyActions
    );

    expect(state1.outputActions[0]).toEqual({id: 2, name: 'editListItem', target: 'list.listItem', type: undefined});
    expect(state2.outputActions[0]).toEqual({id: 1, name: 'editListItem', target: undefined, type: 'setIn'});
    expect(state1.nextId).toEqual(3);
  });

  test('Adds store properties correctly', () => {
    let [state6, state5, state4, state3, state2, state1] = applier.applyActions(
      initialState,
      ...addPropertyActions
    );

    expect(state6.properties[1].elementSchema.properties[0]).toEqual({type: 'String'});
    expect(state5.properties[1].elementSchema).toEqual({type: 'Object', properties: []});
    expect(state4.properties[1]).toEqual({type: 'Array', elementSchema: {}});
    expect(state3.properties[0].properties[0]).toEqual({type: 'String'});
    expect(state2.properties[0]).toEqual({type: 'Object', properties: []});
    expect(state1.properties[0]).toEqual({type: 'String'});
  });

  test('Removes store properties correctly', () => {
    let removePropertyActions = [
      {name: 'removeOutputStoreProperty', args: [[0, 0]]},
      {name: 'removeOutputStoreProperty', args: [[0]]},
      {name: 'removeOutputStoreProperty', args: [[0, 'elementSchema', 0]]}
    ];

    let [state3, state2, state1] = applier.applyActions(
      initialState,
      ...addPropertyActions,
      ...removePropertyActions
    );

    expect(state1.properties[0].properties).toEqual([]);
    expect(state1.properties.length).toBe(2);
    expect(state2.properties.length).toBe(1);
    expect(state2.properties[0].elementSchema.properties.length).toBe(1);
    expect(state3.properties[0].elementSchema.properties.length).toBe(0);
  });

  test('Toggles store edits modal', () => {
    let [state3, state2, state1] = applier.applyActions(
      initialState,
      ...addPropertyActions,
      {name: 'toggleEditModal', args: [[0, 1]]},
      {name: 'toggleEditModal'},
      {name: 'toggleEditModal', args: [[0, 0]]}
    );

    expect(state1.editing).toEqual({});
    expect(state2.editing).toBe(null);
    expect(state3.editing).toEqual({type: 'String'});
  });
});