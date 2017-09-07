import _ from 'lodash';

export const createActionAppliers = (actionCreators, reducer) => {
  return _.mapValues(
    actionCreators,
    (actionCreator) =>
      (state, ...actionCreatorArgs) =>
        reducer(
          state,
          actionCreator(...actionCreatorArgs)
        )
  );
};

export class ChainedActionApplier {
  constructor(actionCreators, reducer) {
    this.actionAppliers = createActionAppliers(actionCreators, reducer);
  }

  applyActions(state, ...actionCreators) {
    let generatedStates = [];
    let nthState = state;
    for (let actionCreator of actionCreators) {
      let name = actionCreator.name;
      let args = actionCreator.args || [];
      if (!(name in this.actionAppliers)) {
        throw `Action Creator: ${name} not found`;
      } else {
        nthState = this.actionAppliers[name](nthState, ...args);
        generatedStates.push(nthState);
      }
    }
    return _.reverse(generatedStates);
  }
}
