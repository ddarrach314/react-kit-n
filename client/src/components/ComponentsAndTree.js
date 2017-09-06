import React from 'react';
import {connect} from 'react-redux';
import store from '../reduxStore';
import OutputComponentList from './OutputComponentList';
import Tree from './Tree';

class ComponentsAndTree extends React.Component {
  render() {
    return (
      <div className="col-md-6 componentsAndTreeCol">
        <div className="row no-gutters">
          <OutputComponentList outputComponents={this.props.outputComponents.components}/>
          <Tree outputComponents={this.props.outputComponents.components}/>
        </div>
      </div>
    );
  }
}

ComponentsAndTree = connect(
  (state) => (
    {
      outputComponents: state.outputComponents
    }
  )
)(ComponentsAndTree);

export default ComponentsAndTree;