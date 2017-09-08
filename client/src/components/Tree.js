import React from 'react';
import utilities from '../utilities/index';
import TreeBranch from './TreeBranch';

class Tree extends React.Component {
  render() {
    return (
      <div className="col-md-8 treeCol">
        <h4>App Tree</h4>
        <div className="tree">
          {utilities.tree.generateTreeArray(
            this.props.outputComponents,
            this.props.outputComponentProps,
            TreeBranch
          )}
        </div>
      </div>
    );
  }
}

export default Tree;
