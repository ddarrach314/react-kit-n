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
      <div>
        Actions:
        <button onClick={actions.createNewOutputAction}>Add Action</button>
        {this.props.outputActions.outputActions.map((outputAction, index) => (
          <OutputAction outputAction={outputAction} targetsTypes={utilities.outputStore.getTargetsFromOutputStore(this.props.outputStore.outputStore)} index={index}/>
        )
        )}
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
        <input value={this.props.outputAction.name} onChange={this.handleChangeName.bind(this)}></input>
        <select value={this.props.outputAction.target} onChange={this.handleChangeTarget.bind(this)}>
          <option value=''></option>
          {Object.keys(this.props.targetsTypes).map((target) => (
            <option value={target}>{target}</option>
          )
          )}
        </select>
        <select value={this.props.outputAction.type} onChange={this.handleChangeType.bind(this)}>
          <option value=''></option>
          {utilities.outputActions.getActionCategoriesForTargetType(this.props.targetsTypes[this.props.outputAction.target]).map((type) => (
            <option value={type}>{type}</option>
          )
          )}
        </select>
        <button onClick={this.handleClickRemove.bind(this)}>Remove Action</button>
      </div>
    );
  }
}

export default OutputActionsForm;