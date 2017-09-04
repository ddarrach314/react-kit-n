import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import unboundActions from '../actions';
import store from '../reduxStore';
import {bindActionCreators} from 'redux';
import utilities from '../utilities/index';

let actions = bindActionCreators(unboundActions, store.dispatch);

class OutputActionsForm extends React.Component {
  render() {
    return (
      <div className="col-5">
        <div className="outputActionsHeading">
          <h2>Actions</h2>
          <button className="btn btn-md btn-primary btn-block" onClick={actions.createNewOutputAction}>Add Action</button>
        </div>
        <div className="outputActionsList">
          {this.props.outputActions.outputActions.map((outputAction, index) => (
            <OutputAction outputAction={outputAction} targetsTypes={utilities.outputStore.getTargetsFromOutputStore(this.props.outputStore.outputStore)} index={index}/>
          )
          )}
        </div>
      </div>
    );
  }
}

OutputActionsForm = connect(
  (state) => (
    {
      outputStore: state.outputStore,
      outputActions: state.outputActions
    }
  )
)(OutputActionsForm);

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
      <div>
        <div>
          {JSON.stringify(this.props.outputAction)}
        </div>
        <div className="row no-gutters">
          <input className="col-3" value={this.props.outputAction.name} onChange={this.handleChangeName.bind(this)}></input>
          <select className="col-3" value={this.props.outputAction.target} onChange={this.handleChangeTarget.bind(this)}>
            <option value=''></option>
            {Object.keys(this.props.targetsTypes).map((target) => (
              <option value={target}>{target}</option>
            )
            )}
          </select>
          <select className="col-3" value={this.props.outputAction.type} onChange={this.handleChangeType.bind(this)}>
            <option value=''></option>
            {utilities.outputActions.getActionCategoriesForTargetType(this.props.targetsTypes[this.props.outputAction.target]).map((type) => (
              <option value={type}>{type}</option>
            )
            )}
          </select>
          <button className="col-3 btn btn-sm btn-primary btn-block"
            onClick={this.handleClickRemove.bind(this)}>Remove Action</button>
        </div>
      </div>
    );
  }
}

export default OutputActionsForm;