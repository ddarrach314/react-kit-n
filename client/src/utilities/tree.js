import TreeBranch from '../components/TreeBranch';
import React from 'react';

export const generateTreeArray = (outputComponents) => {
  let treeArray = [];
  let traverseOutputComponents = (indent, id) => {
    treeArray.push(<TreeBranch name={outputComponents[id].name} indent={indent} />);
    outputComponents[id].children.forEach((child) => {
      traverseOutputComponents(indent + 20, child);
    });
  };
  traverseOutputComponents(0, '0');
  return treeArray;
};