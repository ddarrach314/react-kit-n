import React from 'react';
import _ from 'lodash';

export const generateTreeArray = (outputComponents, outputComponentProps, outputStorePropsOptions, outputActions, TreeBranch) => {
  let treeArray = [];
  let traverseOutputComponents = (indent, componentId, outputPropsKey) => {
    let inheritsConnection = checkForInheritedConnection(outputPropsKey, outputComponentProps);
    let connectionCanBeToggled = !inheritsConnection && !checkForConnectedDescendants(outputPropsKey, outputComponentProps);
    let outputPropNames = outputComponentProps[outputPropsKey] && outputComponentProps[outputPropsKey].storeProps
      ? Object.values(outputComponentProps[outputPropsKey].storeProps)
      : [];
    outputPropNames = outputPropNames.map((name) => (
      name.toLowerCase()
    ));
    treeArray.push(<TreeBranch name={outputComponents[componentId].name} 
      indent={indent} 
      id={componentId} 
      outputPropsKey={outputPropsKey}
      outputComponentProps={outputComponentProps[outputPropsKey]}
      inheritsConnection={inheritsConnection}
      connectionCanBeToggled={connectionCanBeToggled}
      outputActions={outputActions}
      outputStorePropsOptions={outputStorePropsOptions.filter((option) => (
        !outputComponentProps[outputPropsKey] 
        || !outputComponentProps[outputPropsKey].storeProps
        || !outputComponentProps[outputPropsKey].storeProps.hasOwnProperty(option)
      )
      )}
      outputPropNames={outputPropNames}/>);
    outputComponents[componentId].children.forEach((child) => {
      traverseOutputComponents(indent + 20, child.componentId, `${outputPropsKey}_${child.childId}`);
    });
  };
  traverseOutputComponents(0, '0', '0');
  return treeArray;
};

export const getAncestorKeys = (ancestryPath) => {
  let ancestorIds = ancestryPath.split('_').slice(0, -1);
  return _.map(
    ancestorIds,
    (ancestorId, index, ancestorIds) =>
      ancestorIds.slice(0, index + 1).join('_')
  );
};

export const checkForInheritedConnection = (outputPropsKey, componentProps) => {
  let ancestorKeys = getAncestorKeys(outputPropsKey);
  for (let ancestorKey of ancestorKeys) {
    if ( componentProps[ancestorKey] &&
         componentProps[ancestorKey].connected === true ) {
      return true;
    }
  }
  return false;
};

export const checkForConnectedDescendants = (outputPropsKey, componentProps) => {
  for (let key in componentProps) {
    if (
      outputPropsKey === key.slice(0, outputPropsKey.length) &&
      outputPropsKey !== key &&
      componentProps[key].connected
    ) {
      return true;
    }
  }
  return false;
};
