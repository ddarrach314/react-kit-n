import React from 'react';
import store from '../reduxStore';
import unboundActions from '../actions';
import {bindActionCreators} from 'redux';

let actions = bindActionCreators(unboundActions, store.dispatch);

class TreeBranch extends React.Component {
  handleDragOver(event) {
    event.preventDefault();
  }

  handleDrop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData('text');
    actions.addChildComponent({parent: this.props.id, child: data});
  }

  render() {
    let divStyle = {
      marginLeft: this.props.indent + 'px'
    };
    return (
      <div style={divStyle} onDragOver={this.handleDragOver.bind(this)} onDrop={this.handleDrop.bind(this)}>{this.props.name}</div>
    );
  }
}

export default TreeBranch;