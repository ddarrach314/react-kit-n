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
  lastUpdatedBy: null
};

describe('Store reducer function', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual(initialState);
  });

  test('Adds components correctly', () => {
    let [state6, state5, state4, state3, state2, state1] = applier.applyActions(
      initialState,
      {name: 'setOutputStoreProperty', args: [{type: 'String'}, ['0']]},
      {name: 'setOutputStoreProperty', args: [{type: 'Object'}, [0]]},
      {name: 'setOutputStoreProperty', args: [{type: 'String'}, [0, 0]]},
      {name: 'setOutputStoreProperty', args: [{type: 'Array'}, [1]]},
      {name: 'setOutputStoreProperty', args: [{type: 'Object'}, [1, 'elementSchema']]},
      {name: 'setOutputStoreProperty', args: [{type: 'String'}, [1, 'elementSchema', 0]]}
    );

    expect(state6.properties[1].elementSchema.properties[0]).toEqual({type: 'String'});
    expect(state5.properties[1].elementSchema).toEqual({type: 'Object', properties: []});
    expect(state4.properties[1]).toEqual({type: 'Array', elementSchema: {}});
    expect(state3.properties[0].properties[0]).toEqual({type: 'String'});
    expect(state2.properties[0]).toEqual({type: 'Object', properties: []});
    expect(state1.properties[0]).toEqual({type: 'String'});
  });
});
