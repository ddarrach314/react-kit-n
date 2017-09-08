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

  render() {
    
  }
}

export default TreeBranchPropOrAction;