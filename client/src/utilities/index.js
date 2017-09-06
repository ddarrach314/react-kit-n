import * as outputStoreUtilities from './outputStore';
import * as outputActionsUtilities from './outputActions';
import * as treeUtilities from './tree';
import _ from 'lodash';

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
      lookupsByFirstKey[firstKey] =
        (lookupsByFirstKey[firstKey] || [])
          .concat(
            lookupParts[1]
          );
    }
  }

  if (_.isEmpty(lookupsByFirstKey)) {
    return _.clone(obj);
  } else {
    let copiedKeys = _.mapValues(
      lookupsByFirstKey,
      (shiftedLookup, key) => {
        return makeMutableCopy(obj[key], shiftedLookup);
      }
    );

    let initial = Array.isArray(obj)
      ? []
      : {};

    return _.assign(initial, obj, copiedKeys);
  }
};

const utilities = {
  makeMutableCopy,
  outputStore: outputStoreUtilities,
  outputActions: outputActionsUtilities,
  tree: treeUtilities
};

export default utilities;
