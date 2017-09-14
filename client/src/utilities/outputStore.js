import React from 'react';
import _ from 'lodash';

export const buildPropertiesPath = (path) => {
  return _.reduce(
    path,
    (accumulator, value, index) => {
      accumulator += `.${value}`;
      if (
        path[index + 1] === 'newProperty' || 
        !isNaN(Number(path[index + 1]))
      ) {
        accumulator += '.properties';
      }
      return accumulator;
    },
    'properties'
  );
};

export const getTargetsFromOutputStore = (properties) => {
  let targetsTypes = {};
 
  let targetGenerator = (properties, path) => {
    properties.forEach((property) => {
      targetsTypes[`${path}${property.name}`] = property.type;
      property.type === 'object' && targetGenerator(property.properties, `${path}${property.name}.`);
    }); 
  }

  targetGenerator(properties, '');

  return targetsTypes;
};

export const generateStoreArray = (outputStore, OutputStoreRow, toggleEditModal) => {
  let storeArray = [];
  let traverseStore = (object, indent, path, isElementSchema) => {
    if (isElementSchema) {
      storeArray.push(<OutputStoreRow path={path} indent={indent} isElementSchema={true} type={object.type} />);
      if (object.type === 'object') {
        storeArray.push(<div style={{marginLeft: indent + 20 + 'px'}}>Properties</div>);
        storeArray.push(<i style={{marginLeft: indent + 20 + 'px'}}
            className="material-icons addStorePropertyButton pointer green"
            onClick={() => {
              toggleEditModal(path.concat('newProperty'));
            }}>add</i>);
        traverseStore(object.properties, indent + 20, path);
      } else if (object.type === 'array') {
        traverseStore(object.elementSchema, indent + 20, path.concat('elementSchema'), true);
      }
    } else {
      object.forEach((property, index) => {
        storeArray.push(<OutputStoreRow path={path.concat(index)} indent={indent} name={property.name} type={property.type} initialValue={property.initialValue} isElementSchema={false} />);
        if (property.type === 'object') {
          storeArray.push(<div style={{marginLeft: indent + 20 + 'px'}}>Properties</div>);
          storeArray.push(<i style={{marginLeft: indent + 20 + 'px'}}
            className="material-icons addStorePropertyButton pointer green"
            onClick={() => {
              toggleEditModal(path.concat([index, 'newProperty']));
            }}>add</i>);
          traverseStore(property.properties, indent + 20, path.concat(index));
        } else if(property.type === 'array') {
          traverseStore(property.elementSchema, indent + 20, path.concat([index, 'elementSchema']), true);
        }
      });
    }
  }
  traverseStore(outputStore, 0, []);
  return storeArray;
}
