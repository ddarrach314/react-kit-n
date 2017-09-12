import * as outputStoreUtilities from './outputStore';
import * as outputActionsUtilities from './outputActions';
import * as treeUtilities from './tree';
import _ from 'lodash';

const applyReducersSequentially = (...reducers) => {
  return (originalState, action) => {
    let updatedState;
    reducers.forEach((reducer) => {
      updatedState = reducer(updatedState || originalState, action);
    });
    return updatedState;
  };
};

const splitOnFirstPeriod = (string) => {
  let firstPeriodIndex = string.indexOf('.');
  if (firstPeriodIndex >= 0) {
    return [
      string.substring(0, firstPeriodIndex),
      string.substring(firstPeriodIndex + 1)
    ];
  } else {
    return [string];
  }
};

const safeSet = (obj, value, lookupPath) => {
  let newObj = makeMutableCopy(obj, lookupPath);
  let keys = lookupPath.split('.');
  let pathKeys = keys.slice(0, keys.length - 1);
  let lastKey = keys[keys.length - 1];

  let nestedObj = newObj;

  for (let key of pathKeys) {
    nestedObj = nestedObj[key];
  }

  nestedObj[lastKey] = value;
  return newObj;
};

const safeDelete = (obj, lookupPath) => {
  let newObj = makeMutableCopy(obj, lookupPath);
  let keys = lookupPath.split('.');
  let pathKeys = keys.slice(0, keys.length - 1);
  let lastKey = keys[keys.length - 1];

  let nestedObj = newObj;

  for (let key of pathKeys) {
    nestedObj = nestedObj[key];
  }

  if (Array.isArray(nestedObj)) {
    nestedObj.splice(lastKey, 1);
  } else {
    delete nestedObj[lastKey];
  }

  return newObj;
};

const makeMutableCopy = (obj, ...lookups) => {
  /*
    Accepts on object and lookups paths.
    Returns an object that may be mutated at any of
    the lookup paths without mutating any reference
    contained in the original object.

    Any reference not included in the lookup paths
    will be unchanged in the returned object.
  */

  let lookupsByFirstKey = {};

  for (let lookup of lookups) {
    let lookupParts = splitOnFirstPeriod(lookup);
    if (lookupParts.length === 2) {
      let firstKey = lookupParts[0];
      if (firstKey in obj) {
        lookupsByFirstKey[firstKey] =
          (lookupsByFirstKey[firstKey] || [])
            .concat(
              lookupParts[1]
            );
      }
    }
  }

  if (_.isEmpty(lookupsByFirstKey)) {
    return _.clone(obj);
  } else {
    let copiedKeys = _.mapValues(
      lookupsByFirstKey,
      (shiftedLookup, key) => {
        return makeMutableCopy(obj[key], ...shiftedLookup);
      }
    );
    let initial = Array.isArray(obj)
      ? []
      : {};

    return _.assign(initial, obj, copiedKeys);
  }
};

const utilities = {
  safeSet,
  safeDelete,
  makeMutableCopy,
  applyReducersSequentially,
  outputStore: outputStoreUtilities,
  outputActions: outputActionsUtilities,
  tree: treeUtilities
};

export default utilities;
