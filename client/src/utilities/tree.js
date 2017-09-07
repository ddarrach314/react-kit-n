import React from 'react';

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
