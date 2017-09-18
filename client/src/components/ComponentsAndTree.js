import React from 'react';
import {connect} from 'react-redux';
import store from '../reduxStore';
import OutputComponentList from './OutputComponentList';
import Tree from './Tree';

class ComponentsAndTree extends React.Component {
  render() {
    return (
      <div className="col-lg-6 componentsAndTreeCol">
        <div className="row no-gutters">

          <OutputComponentList outputComponents={this.props.outputComponents.components} />

          <Tree
            outputStore={this.props.outputStore.outputStore}
            outputActions={this.props.outputActions.outputActions}
            outputComponents={this.props.outputComponents.components}
            editing={this.props.outputComponents.editing}
          />
        </div>
      </div>
    );
  }
}

ComponentsAndTree = connect(
  (state) => ({
    outputComponents: state.outputComponents,
    outputStore: state.outputStore,
    outputActions: state.outputActions
  })
)(ComponentsAndTree);

export default ComponentsAndTree;
