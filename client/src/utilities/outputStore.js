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

export const generateStoreArray = (outputStore, OutputStoreRow) => {
  let storeArray = [];
  let traverseStore = (object, indent, isElementSchema) => {
    if (isElementSchema) {
      storeArray.push(<OutputStoreRow indent={indent} isElementSchema={true} propertyType={object.type} />);
      if (object.type === 'object') {
        traverseStore(object.properties, indent + 20);
      } else if (object.type === 'array') {
        traverseStore(object.elementSchema, indent + 20, true);
      }
    } else {
      object.forEach((property) => {
        storeArray.push(<OutputStoreRow indent={indent} propertyName={property.name} propertyType={property.type} initialValue={property.initialValue} isElementSchema={false} />);
        property.type === 'object' && traverseStore(property.properties, indent + 20);
        property.type === 'array' && traverseStore(property.elementSchema, indent + 20, true);
      });
    }
  }
  traverseStore(outputStore, 0);
  return storeArray;
}
