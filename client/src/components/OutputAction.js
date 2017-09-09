import React from 'react';
import unboundActions from '../actions';
import store from '../reduxStore';
import {bindActionCreators} from 'redux';
import utilities from '../utilities/index';

let actions = bindActionCreators(unboundActions, store.dispatch);

class OutputAction extends React.Component {
  handleChangeTarget(event) {
    actions.editOutputActionTarget(this.props.index, event.target.value);
  }

  handleChangeType(event) {
    actions.editOutputActionType(this.props.index, event.target.value);
  }

  handleChangeName(event) {
    actions.editOutputActionName(this.props.index, event.target.value);
  }

  handleClickRemove() {
    actions.removeOutputAction(this.props.index);
  }

  render() {
    return (
      <div className="row no-gutters">
        <div className="col-3">
          <p>Name</p>
          <input className="outputActionName" value={this.props.outputAction.name} onChange={this.handleChangeName.bind(this)}></input>
        </div>
        <div className="col-4">
          <p>Target</p>
          <select className="outputActionSelect" value={this.props.outputAction.target} onChange={this.handleChangeTarget.bind(this)}>
            <option value=''></option>
            {Object.keys(this.props.targetsTypes).map((target) => (
              <option value={target}>{target}</option>
            )
            )}
          </select>
        </div>
        <div className="col-4">
          <p>Type</p>
          <select className="outputActionSelect" value={this.props.outputAction.type} onChange={this.handleChangeType.bind(this)}>
            <option value=''></option>
            {utilities.outputActions.getActionCategoriesForTargetType(this.props.targetsTypes[this.props.outputAction.target]).map((type) => (
              <option value={type}>{type}</option>
            )
            )}
          </select>
        </div>
        <i className="material-icons col-1 align-self-end removeOutputAction pointer red" 
          onClick={this.handleClickRemove.bind(this)}>clear</i>
      </div>
    );
  }
}

export default OutputAction;