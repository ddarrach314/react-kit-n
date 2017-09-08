import React from 'react';
import _ from 'lodash';

export const generateTreeArray = (outputComponents, TreeBranch) => {
  let treeArray = [];
  let traverseOutputComponents = (indent, id) => {
    treeArray.push(<TreeBranch name={outputComponents[id].name} indent={indent} id={id}/>);
    outputComponents[id].children.forEach((child) => {
      traverseOutputComponents(indent + 20, child.componentId);
    });
  };
  traverseOutputComponents(0, '0');
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
