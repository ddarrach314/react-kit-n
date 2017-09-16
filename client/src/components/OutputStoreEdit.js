import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import unboundActions from '../actions';
import store from '../reduxStore';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

let actions = bindActionCreators(unboundActions, store.dispatch);

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class OutputStoreEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      initialValue: '',
      type: '',
      invalidName: false,
      invalidInitialValue: false,
      invalidType: false
    }
  }

  handleClose() {
    actions.toggleEditStoreModal(this.props.outputStore.editing.path);
  };

  handleSubmit() {
    try {
      let isElementSchema = this.props.outputStore.editing.path[this.props.outputStore.editing.path.length - 1] === 'elementSchema'
                              ? true
                              : false;
      let initialValue = this.state.initialValue;
      
      if (!isElementSchema) {
        if (this.state.name === '' || this.state.name.indexOf(' ') >= 0) {
          throw 'name';
        }
        if (this.state.type === '') {
          throw 'type';
        }

        if (initialValue === '' || initialValue === 'undefined' || initialValue === undefined) {
          initialValue = undefined;

        } else if (initialValue === "''" || initialValue === '""') {
          initialValue = '';

        } else {
          initialValue = initialValue.replace(/'/g, '"');
          initialValue = JSON.parse(initialValue);

        }
      }
      
      let setProperty = isElementSchema ? {type: this.state.type || undefined} : {name: this.state.name, initialValue, type: this.state.type};
      actions.setOutputStoreProperty(setProperty, this.props.outputStore.editing.path);
      actions.toggleEditStoreModal(this.props.outputStore.editing.path);

    } catch(error) {
      if (error === 'name') {
        this.setState({invalidName: true});
      } else if (error === 'type') {
        this.setState({invalidName: false, invalidType: true});
      } else {
        this.setState({invalidName: false, invalidType: false, invalidInitialValue: true});
      }
    }
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleChangeInitialValue(event) {
    this.setState({initialValue: event.target.value});
  }

  handleChangeType(event, key, payload) {
    this.setState({type: payload});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.outputStore.editing) {
      console.log(nextProps.outputStore.editing.path);
      let property = nextProps.outputStore.editing.property;
      this.setState({
        name: property.name || '',
        initialValue: JSON.stringify(property.initialValue),
        type: property.type || '',
        invalidName: false,
        invalidType: false,
        invalidInitialValue: false
      });
    } else {
      this.setState({
        name: '',
        initialValue: '',
        type: '',
        invalidName: false,
        invalidType: false,
        invalidInitialValue: false
      });
    }
  }

  render() {
    let isElementSchema;
    if (this.props.outputStore.editing) {
      isElementSchema = this.props.outputStore.editing.path[this.props.outputStore.editing.path.length - 1] === 'elementSchema'
                            ? true
                            : false;
    } else {
      isElementSchema = false;
    }
    
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose.bind(this)}
        labelStyle={{color:'#6653ff'}}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit.bind(this)}
        labelStyle={{color:'#6653ff'}}
      />
    ];

    return (
      <div>
        <Dialog
          title={this.props.outputStore.editing &&
              this.props.outputStore.editing.path[this.props.outputStore.editing.path.length - 1] === 'newProperty' 
              ? "Add Property" 
              : "Edit Property"}
          actions={actions}
          modal={false}
          open={this.props.outputStore.editing === null ? false : true}
          onRequestClose={this.handleClose.bind(this)}
          className="outputStoreActionEditFormRow"
        >
          {!isElementSchema &&
            <div>
              <TextField floatingLabelText="Name" 
                value={this.state.name} 
                onChange={this.handleChangeName.bind(this)} 
                style={{marginRight: '4em'}}
                underlineFocusStyle={{borderBottomColor:'#6653ff'}}
                floatingLabelFocusStyle={{color:'#6653ff'}}/>
              <TextField floatingLabelText="Initial Value" 
                value={this.state.initialValue} 
                onChange={this.handleChangeInitialValue.bind(this)}
                underlineFocusStyle={{borderBottomColor:'#6653ff'}}
                floatingLabelFocusStyle={{color:'#6653ff'}}/>
            </div>}
          <SelectField floatingLabelText="Type" 
            value={this.state.type} 
            onChange={this.handleChangeType.bind(this)}
            selectedMenuItemStyle={{color:'#6653ff'}}>
            <MenuItem value={'String'} primaryText="String" />
            <MenuItem value={'Number'} primaryText="Number" />
            <MenuItem value={'Boolean'} primaryText="Boolean" />
            <MenuItem value={'Object'} primaryText="Object" />
            <MenuItem value={'Array'} primaryText="Array" />
          </SelectField>
          {this.state.invalidName && <div className="red">Please enter a name with no spaces</div>}
          {this.state.invalidType && <div className="red">Please select a type</div>}
          {this.state.invalidInitialValue && <div className="red">Please enter a valid initial value or leave that field blank</div>}
        </Dialog>
      </div>
    );
  }
}

OutputStoreEdit = connect(
  (state) => (
    {
      outputStore: state.outputStore
    }
  )
)(OutputStoreEdit);

export default OutputStoreEdit;