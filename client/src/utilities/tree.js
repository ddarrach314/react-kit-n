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

export const checkForInheritedConnection = (ancestryPath, componentProps) => {
  let ancestorKeys = getAncestorKeys(ancestryPath);
  for (let ancestorKey of ancestorKeys) {
    if ( componentProps[ancestorKey] &&
         componentProps[ancestorKey].connected === true ) {
      return true;
    }
  }
  return false;
};
