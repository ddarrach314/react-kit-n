import * as types from './types';

export const setOutputStore = (newStore, lastUpdatedBy) => (
  {
    type: types.SET_OUTPUT_STORE,
    newStore,
    lastUpdatedBy
  }
);

export const setOutputStoreWarning = (warning) => (
  {
    type: types.SET_OUTPUT_STORE_WARNING,
    warning
  }
);