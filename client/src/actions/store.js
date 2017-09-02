import * as types from './types';

export const setStore = (newStore, lastUpdatedBy) => (
  {
    type: types.SET_STORE,
    newStore,
    lastUpdatedBy
  }
);

export const setStoreWarning = (warning) => (
  {
    type: types.SET_STORE_WARNING,
    warning
  }
);