import React from 'react';
import _ from 'lodash';

export const _getChildAvailableProps = (component, availableProps) => {
  if (availableProps !== undefined) {
    return new Set(
      component.parentProps
        .filter(prop => availableProps.has(prop.parentProp))
        .map(prop => prop.childProps)
    );
  } else if (component.connected) {
    return new Set(
      component.storeProps.
        map(prop => prop.propName)
    );
  }
};

export const generateTreeArray = (
  outputComponents,
  outputActions,
  TreeBranch
) => {
  let treeArray = [];

  const traverseOutputComponents = (
    indent,
    componentId,
    availableProps,
    inheritsConnection = false
  ) => {
    let component = outputComponents[componentId];
    let hasConnectedDescendant = checkForConnectedDescendants(componentId, outputComponents);
    let connectionCanBeToggled = !inheritsConnection && !hasConnectedDescendant;
    let childrenInheritConnection = inheritsConnection || component.connected;

    treeArray.push(
      <TreeBranch
        id={componentId}
        outputComponent={component}
        indent={indent}
        inheritsConnection={inheritsConnection}
        connectionCanBeToggled={connectionCanBeToggled}
        outputActions={outputActions}
        availableProps={availableProps}
      />
    );

    let childAvailableProps = _getChildAvailableProps(component, availableProps);

    outputComponents[componentId].children.forEach((child) => {
      traverseOutputComponents(
        indent + 20,
        child.componentId,
        childAvailableProps,
        childrenInheritConnection
      );
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

export const checkForConnectedDescendants = (componentId, outputComponents) => {
  let component = outputComponents[componentId];
  if (component.children.length === 0) {
    return false;
  }
  return _.some(
    component.children,
    (child) =>
      outputComponents[child.componentId].connected ||
      checkForConnectedDescendants(child.componentId, outputComponents)
  );
};
