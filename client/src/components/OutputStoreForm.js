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

  componentDidMount() {
    var context = this;
    var textareas = document.getElementsByTagName('textarea');
    var count = textareas.length;
    for (var i = 0; i < count; i++) {
      textareas[i].onkeydown = function(e) {
        if (e.keyCode === 9 || e.which === 9) {
          e.preventDefault();
          var s = this.selectionStart;
          this.value = this.value.substring(0, this.selectionStart) + '\t' + this.value.substring(this.selectionEnd);
          this.selectionEnd = s + 1; 
          context.setState({storeInput: this.value}, context.processTextArea);
        }
      };
    }
  }

  render() {
    return (
      <div className="col-md-3 outputStoreCol">
        <h3>Store</h3>
        <textarea className="outputStoreFormTextArea"
          value={this.state.storeInput}
          onChange={this.handleChangeTextArea}/>
        <div className="outputStoreFormError">{this.props.outputStore.warning}</div>
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