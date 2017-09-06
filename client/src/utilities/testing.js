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
