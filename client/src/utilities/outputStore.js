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
      property.type === 'Object' && targetGenerator(property.properties, `${path}${property.name}.`);
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

      if (object.type === 'Object') {
        storeArray.push(
          <div className="outputStoreObjectProperties">
            <div style={{marginLeft: indent + 40 + 'px'}}><b>Properties:</b></div>
            <i className="material-icons addButton pointer green"
              onClick={() => {
                toggleEditModal(path.concat('newProperty'));
              }}>add</i>
          </div>
        );
        
        traverseStore(object.properties, indent + 40, path);

      } else if (object.type === 'Array') {
        traverseStore(object.elementSchema, indent + 40, path.concat('elementSchema'), true);

      }

    } else {
      object.forEach((property, index) => {
        storeArray.push(<OutputStoreRow path={path.concat(index)} indent={indent} name={property.name} type={property.type} initialValue={property.initialValue} isElementSchema={false} />);

        if (property.type === 'Object') {
          storeArray.push(
            <div className="outputStoreObjectProperties">
              <div style={{marginLeft: indent + 40 + 'px'}}><b>Properties:</b></div>
              <i className="material-icons addButton pointer green"
                onClick={() => {
                  toggleEditModal(path.concat([index, 'newProperty']));
                }}>add</i>
            </div>
          );
          
          traverseStore(property.properties, indent + 40, path.concat(index));

        } else if(property.type === 'Array') {
          traverseStore(property.elementSchema, indent + 40, path.concat([index, 'elementSchema']), true);

        }
      });
    }
  }

  traverseStore(outputStore, 0, []);

  return storeArray;
}

export const convertPropertiesIntoObject = (properties) => {
  let initialState = {};

  let traverseObject = (objProperties, objToSetIn) => {
    objProperties.forEach((objProperty) => {
      if (objProperty.type === 'String') {
        objToSetIn[objProperty.name] = '';

      } else if (objProperty.type === 'Array') {
        objToSetIn[objProperty.name] = [];

      } else if (objProperty.type === 'Object') {
        objToSetIn[objProperty.name] = {};
        traverseObject(objProperty.properties, objToSetIn[objProperty.name]);

      } else {
        objToSetIn[objProperty.name] = null;

      }
    });
  }

  properties.forEach((property) => {
    if (property.initialValue === '') {
      if (property.type === 'String') {
        initialState[property.name] = '';

      } else if (property.type === 'Array') {
        initialState[property.name] = [];

      } else if (property.type === 'Object') {
        let objInitialValue = {};
        traverseObject(property.properties, objInitialValue);
        initialState[property.name] = objInitialValue;

      } else {
        initialState[property.name] = null;

      }


    } else if (property.initialValue === 'undefined') {
      initialState[property.name] = undefined;


    } else {
      initialState[property.name] = JSON.parse(property.initialValue);

    }
  });

  return initialState;
}



