import React from 'react';
import TreeBranch from './TreeBranch';
import utilities from '../utilities/index';

class Tree extends React.Component {
  render() {
    return (
      <div className="col-md-8 treeCol">
        <h4>App Tree</h4>
        <div className="tree">
          {utilities.tree.generateTreeArray(this.props.outputComponents)}
        </div>
      </div>
    );
  }
}

export default Tree;