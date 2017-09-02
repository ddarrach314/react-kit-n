import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {outputActionsActions} from '../actions';
import store from '../reduxStore';
import {bindActionCreators} from 'redux';

outputActionsActions = bindActionCreators(outputActionsActions, store.dispatch);

class OutputActionsForm extends React.Component {
  render() {
    <div>
      Actions:

    </div>;
  }
}

OutputActionsForm = connect(
  (state) => (
    {store: state.outputStoreReducer}
  )
)(OutputActionsForm);