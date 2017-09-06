import React from 'react';
import OutputComponentList from './OutputComponentList';
import Tree from './Tree';

const sampleOutputComponents = {
  '0': {
    name: 'App',
    children: ['1', '3']
  },
  '1': {
    name: 'Child1',
    children: ['4']
  },
  '3': {
    name: 'Child2',
    children: []
  },
  '4': {
    name: 'Grandchild1',
    children: []
  }
};

class ComponentsAndTree extends React.Component {
  render() {
    return (
      <div className="col-md-6 componentsAndTreeCol">
        <div className="row no-gutters">
          <OutputComponentList outputComponents={sampleOutputComponents}/>
          <Tree outputComponents={sampleOutputComponents}/>
        </div>
      </div>
    );
  }
}

export default ComponentsAndTree;