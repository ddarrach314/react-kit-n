import _ from 'lodash';

export const buildPropertiesPath = (path) => {
  return _.reduce(
    path,
    (accumulator, value, index) => {
      accumulator += `.${value}`;
      if (!isNaN(Number(path[index + 1]))) {
        accumulator += '.properties';
      }
      return accumulator;
    },
    'properties'
  );
};


export const getTargetsFromOutputStore = (outputStore) => {
  let targetsTypes = {};
  let objMapper = (targets, parent = '') => {
    for (var key in targets) {
      let type = typeof targets[key];
      if (type === 'object') {
        if (Array.isArray(targets[key])) {
          targetsTypes[parent + key] = 'array';
          continue;
        } else if (targets[key] === null) {
          targetsTypes[parent + key] = 'null';
          continue;
        } else {
          targetsTypes[parent + key] = type;
          objMapper(targets[key], parent + key + '.');
          continue;
        }
      }
      targetsTypes[parent + key] = type;
    }
  };
  objMapper(outputStore);
  return targetsTypes;
};
