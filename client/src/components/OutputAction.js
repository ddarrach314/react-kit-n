import React from 'react';
import unboundActions from '../actions';
import store from '../reduxStore';
import {bindActionCreators} from 'redux';
import utilities from '../utilities/index';

let actions = bindActionCreators(unboundActions, store.dispatch);

class OutputAction extends React.Component {
  handleClickEdit() {
    actions.toggleEditActionModal(this.props.index);
  }

  handleClickRemove() {
    actions.removeOutputAction(this.props.index);
  }

  render() {
    return (
      <div className="row no-gutters">
        <div className="col-3">
          {this.props.outputAction.name}
        </div>
        <div className="col-3">
          {this.props.outputAction.target}
        </div>
        <div className="col-4">
          {this.props.outputAction.type}
        </div>
        <i className="material-icons col-1 pointer" 
          onClick={this.handleClickEdit.bind(this)}>mode_edit</i>
        <i className="material-icons col-1 align-self-end removeOutputAction pointer red" 
          onClick={this.handleClickRemove.bind(this)}>clear</i>
      </div>
    );
  }
}

export default OutputAction;