import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import actions from '../actions';
import {bindActionCreators} from 'redux';

class OutputStoreForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeInput: JSON.stringify({})
    };
    this.processTextArea = _.debounce(this.processTextArea.bind(this), 1000);
    this.handleChangeTextArea = this.handleChangeTextArea.bind(this);
  }

  handleChangeTextArea(event) {
    this.setState({storeInput: event.target.value}, this.processTextArea);
  }

  processTextArea() {
    let newStoreInput = this.state.storeInput;
    try {
      var parsedNewStoreInput = JSON.parse(newStoreInput);
      this.props.actions.setOutputStore(parsedNewStoreInput, 'STORE_FORM');
    } catch (error) {
      this.props.actions.setOutputStoreWarning(error.toString(), 'STORE_FORM');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.outputStore.lastUpdatedBy !== 'STORE_FORM') {
      this.setState({
        storeInput: JSON.stringify(nextProps.outputStore.outputStore)
      });
    }
  }

  render() {
    return (
      <div>
        {this.props.outputStore.warning}
        <textarea value={this.state.storeInput} onChange={this.handleChangeTextArea} ></textarea>
      </div>
    );
  }
}

OutputStoreForm = connect(
  (state) => (
    {outputStore: state.outputStore}
  ),
  (dispatch) => (
    {
      actions: bindActionCreators(actions, dispatch)
    }
  )
)(OutputStoreForm);

export default OutputStoreForm;