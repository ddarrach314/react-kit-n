import React from 'react';
import TreeBranch from './TreeBranch';
import utilities from '../utilities/index';

class Tree extends React.Component {
  render() {
    return (
      <div className="col-3">
        <h2>App Tree</h2>
        <div className="tree">
          {utilities.tree.generateTreeArray(this.props.outputComponents)}
        </div>
      </div>
    );
  }
}

export default Tree;