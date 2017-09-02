import * as types from './types';

export const setOutputStore = (newOutputStore, lastUpdatedBy) => (
  {
    type: types.SET_OUTPUT_STORE,
    newOutputStore,
    lastUpdatedBy
  }
);

export const setOutputStoreWarning = (warning) => (
  {
    type: types.SET_OUTPUT_STORE_WARNING,
    warning
  }
);