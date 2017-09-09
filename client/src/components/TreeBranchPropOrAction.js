import React from 'react';
import unboundActions from '../actions';
import store from '../reduxStore';
import {bindActionCreators} from 'redux';

let actions = bindActionCreators(unboundActions, store.dispatch);

class TreeBranchPropOrAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hover: false};
  }

  handleClickDeleteProp() {

  }

  render() {
    return (
      <div className="treeBranchPropOrAction">
        <div>{this.props.storeProp}</div>
        <i className="material-icons pointer red" 
          onClick={this.handleClickDeleteProp.bind(this)}>clear</i>
      </div>
    );
  }
}

export default TreeBranchPropOrAction;