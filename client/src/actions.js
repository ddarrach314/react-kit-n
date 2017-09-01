import {bindActionCreators} from 'redux';

const SET_STORE = 'SET_STORE';
const SET_STORE_WARNING = 'SET_STORE_WARNING';

export const types = {
  SET_STORE,
  SET_STORE_WARNING
};

const setStore = (newStore, lastUpdatedBy) => {
  console.log('****');
  return {
    type: SET_STORE,
    newStore,
    lastUpdatedBy
  };
};

const setStoreWarning = (warning) => (
  {
    type: SET_STORE_WARNING,
    warning
  }
);

export const actions = {
  setStore,
  setStoreWarning
};