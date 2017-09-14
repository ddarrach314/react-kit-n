import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import unboundActions from '../actions';
import store from '../reduxStore';
import {bindActionCreators} from 'redux';
import utilities from '../utilities/index';
import OutputAction from './OutputAction';
import OutputActionsEdit from './OutputActionsEdit';

let actions = bindActionCreators(unboundActions, store.dispatch);

class OutputActionsForm extends React.Component {
  render() {
    return (
      <div className="col-md-3 outputActionsCol">
        <div className="outputActionsHeading">
          <h4>Actions</h4>
          <i className="material-icons addActionButton pointer green"
            onClick={actions.createNewOutputAction}>add</i>
        </div>
        <div className="outputActionsList">
          {this.props.outputActions.outputActions.map((outputAction, index) => (
            <OutputAction outputAction={outputAction} 
              // targetsTypes={utilities.outputStore.getTargetsFromOutputStore(this.props.outputStore.outputStore)} 
              index={index}/>
          )
          )}
        </div>
        <OutputActionsEdit />
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

export default OutputActionsForm;