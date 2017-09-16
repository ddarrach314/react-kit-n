import _ from 'lodash';
import * as actions from '../src/actions/outputStore';
import reducer from '../src/reducers/outputStore';
import {
  createActionAppliers,
  ChainedActionApplier
} from '../src/utilities/testing';

const actionAppliers = createActionAppliers(actions, reducer);
const applier = new ChainedActionApplier(actions, reducer);

const initialState = {
  properties: [],
  warning: '',
  lastUpdatedBy: null,
  editing: null
};

describe('Store reducer function', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual(initialState);
  });

  let addPropertyActions = [
    {name: 'setOutputStoreProperty', args: [{type: 'String'}, ['newProperty']]},
    {name: 'setOutputStoreProperty', args: [{type: 'Object'}, ['newProperty']]},
    {name: 'setOutputStoreProperty', args: [{type: 'Array'}, [0, 'newProperty']]},
    {name: 'setOutputStoreProperty', args: [{type: 'Array'}, ['newProperty']]},
    {name: 'setOutputStoreProperty', args: [{type: 'Object'}, [1, 'elementSchema']]},
    {name: 'setOutputStoreProperty', args: [{type: 'String'}, [1, 'elementSchema', 'newProperty']]}
  ];

  test('Adds store properties correctly', () => {
    let [state6, state5, state4, state3, state2, state1] = applier.applyActions(
      initialState,
      ...addPropertyActions
    );

    expect(state6.properties[1].elementSchema.properties[0]).toEqual({type: 'String'});
    expect(state5.properties[1].elementSchema).toEqual({type: 'Object', properties: []});
    expect(state4.properties[0]).toEqual({type: 'Array', elementSchema: {}});
    expect(state3.properties[0].properties[0]).toEqual({"elementSchema": {}, "type": "Array"});
    expect(state2.properties[0]).toEqual({type: 'Object', properties: []});
    expect(state1.properties[0]).toEqual({type: 'String'});
  });

  test('Removes store properties correctly', () => {
    let removePropertyActions = [
      {name: 'removeOutputStoreProperty', args: [[1, 'elementSchema', 0]]},
      {name: 'removeOutputStoreProperty', args: [[0]]},
      {name: 'removeOutputStoreProperty', args: [[0]]}
    ];

    let [state3, state2, state1] = applier.applyActions(
      initialState,
      ...addPropertyActions,
      ...removePropertyActions
    );

    expect(state1.properties[1].elementSchema.properties).toEqual([]);
    expect(state1.properties.length).toBe(3);
    expect(state2.properties.length).toBe(2);
    expect(state2.properties[0].elementSchema.properties.length).toBe(0);
    expect(state3.properties[0].type).toEqual('String');
  });

  test('Toggles store edits modal', () => {
    let [state3, state2, state1] = applier.applyActions(
      initialState,
      ...addPropertyActions,
      {name: 'toggleEditStoreModal', args: [['newProperty']]},
      {name: 'toggleEditStoreModal'},
      {name: 'toggleEditStoreModal', args: [[1, 'elementSchema', 0]]}
    );

    expect(state1.editing).toEqual({"path": ["newProperty"], "property": {}});
    expect(state2.editing).toBe(null);
    expect(state3.editing.property).toEqual({type: 'String'});
  });
});
