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

  test('Adds actions correctly', () => {
    let addActionActions = [
      {name: 'createNewOutputAction', args: [{name: 'changeName', target: undefined, type: 'set'}]},
      {name: 'createNewOutputAction', args: [{name: 'editListItem', target: 'list.listItem', type: undefined}]}
    ];

    let [state2, state1] = applier.applyActions(
      initialState,
      ...addActionActions
    );

    expect(state1.outputActions[0]).toEqual({id: 1, name: 'changeName', target: undefined, type: 'set'});
    expect(state2.outputActions[0]).toEqual({id: 2, name: 'editListItem', target: 'list.listItem', type: undefined});
    expect(state2.nextId).toEqual(3);
  });

  test('Edits actions correctly', () => {
    let addActionActions = [
      {name: 'createNewOutputAction', args: [{name: 'changeName', target: undefined, type: 'set'}]}
    ];

    let [state1] = applier.applyActions(
      initialState,
      ...addActionActions
    );

    let editActionActions = [
      {name: 'editOutputAction', args: [0, {id: 1, name: 'editListItem', target: 'list.listItem', type: undefined}]},
      {name: 'editOutputAction', args: [0, {id: 1, name: 'editListItem', target: undefined, type: undefined}]}
    ];

    let [state3, state2] = applier.applyActions(
      state1,
      ...editActionActions
    );

    expect(state2.outputActions[0]).toEqual({id: 1, name: 'editListItem', target: 'list.listItem', type: undefined});
    expect(state3.outputActions[0]).toEqual({id: 1, name: 'editListItem', target: undefined, type: undefined});
  });

  test('Removes actions correctly', () => {
    let addActionActions = [
      {name: 'createNewOutputAction', args: [{name: 'changeName', target: undefined, type: 'set'}]}
    ];

    let [state1] = applier.applyActions(
      initialState,
      ...addActionActions
    );

    let removeActionActions = [
      {name: 'removeOutputAction', args: [0]}
    ];

    let [state2] = applier.applyActions(
      state1,
      ...removeActionActions
    );

    expect(state2.outputActions.length).toEqual(0);
  });

  test('Toggles actions edits modal', () => {
    let addActionActions = [
      {name: 'createNewOutputAction', args: [{name: 'changeName', target: undefined, type: 'set'}]}
    ];

    let [state1] = applier.applyActions(
      initialState,
      ...addActionActions
    );

    let toggleEditActionModalActions = [
      {name: 'toggleEditActionModal', args: [0]},
      {name: 'toggleEditActionModal', args: [0]},
      {name: 'toggleEditActionModal', args: ['newAction']}
    ];

    let [state4, state3, state2] = applier.applyActions(
      state1,
      ...toggleEditActionModalActions
    );

    expect(state2.editing.action).toEqual({id: 1, name: 'changeName', target: undefined, type: 'set'});
    expect(state2.editing.index).toEqual(0);
    expect(state3.editing).toEqual(null);
    expect(state4.editing).toEqual({action: {}, index: 'newAction'});
  });
});