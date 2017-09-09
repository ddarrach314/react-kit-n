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

  handleClickDeletePropOrAction() {
    actions.removeStorePropFromComponent(this.props.outputPropsKey, this.props.storeProp);
  }

  handleMouseEnter() {
    this.setState({hover: true});
  }

  handleMouseLeave() {
    this.setState({hover: false});
  }

  render() {
    return (
      <div className="treeBranchPropOrAction" onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
        <div>{this.props.storeProp}</div>
        {this.state.hover && <i className="material-icons pointer red" 
          onClick={this.handleClickDeletePropOrAction.bind(this)}>clear</i>}
      </div>
    );
  }
}

export default TreeBranchPropOrAction;