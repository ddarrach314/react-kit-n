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
import utilities from '../utilities/index';

// PAGE SHRINK NEEDS ATTENTION

let actions = bindActionCreators(unboundActions, store.dispatch);

class OutputActionsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      target: '',
      type: '',
      invalidName: false
    }
  }

  handleClose() {
    actions.toggleEditActionModal(this.props.outputActions.editing.index);
  };

  handleSubmit() {
    let names = this.props.outputActions.outputActions.map((outputAction, index) => {
      if (index !== this.props.outputActions.editing.index) {
        return outputAction.name
      }
    }
    );
    if (this.state.name === '' || this.state.name.indexOf(' ') >= 0 || names.includes(this.state.name)) {
      this.setState({invalidName: true});
    } else {
      if (this.props.outputActions.editing.index === 'newAction') {
        actions.createNewOutputAction({
          name: this.state.name,
          target: this.state.target || undefined,
          type: this.state.type || undefined
        });

      } else {
        actions.editOutputAction(this.props.outputActions.editing.index, {
          id: this.props.outputActions.editing.action.id,
          name: this.state.name,
          target: this.state.target || undefined,
          type: this.state.type || undefined
        });

      }
      actions.toggleEditActionModal(this.props.outputActions.editing.index);
    }
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleChangeTarget(event, key, payload) {
    this.setState({target: payload});
  }

  handleChangeType(event, key, payload) {
    this.setState({type: payload});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.outputActions.editing) {
      let action = nextProps.outputActions.editing.action;
      this.setState({
        name: action.name || '',
        target: action.target || '',
        type: action.type || '',
        invalidName: false
      });
    } else {
      this.setState({
        name: '',
        target: '',
        type: '',
        invalidName: false
      });
    }
  }

  render() {
    
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
          title={this.props.outputActions.editing &&
              this.props.outputActions.editing.index === 'newAction' 
              ? "Add Action" 
              : "Edit Action"}
          actions={actions}
          modal={false}
          open={this.props.outputActions.editing === null ? false : true}
          onRequestClose={this.handleClose.bind(this)}
          className="outputStoreActionEditFormRow"
          contentStyle={
            {
              width: '468px',
              position: 'fixed',
              left: '50%',
              top: '5%',
              marginLeft: '-234px',
            }
          }
        >
          <TextField floatingLabelText="Name" 
            value={this.state.name} 
            onChange={this.handleChangeName.bind(this)}
            underlineFocusStyle={{borderBottomColor:'#6653ff'}}
            floatingLabelFocusStyle={{color:'#6653ff'}}/>
          <div>
            <SelectField floatingLabelText="Target" 
              value={this.state.target} 
              onChange={this.handleChangeTarget.bind(this)}
              disabled={Object.keys(this.props.targetsTypes).length ? false : true}
              style={{marginRight: '4em'}}
              selectedMenuItemStyle={{color:'#6653ff'}}>
              {Object.keys(this.props.targetsTypes).map((target) => (
                <MenuItem value={target} primaryText={target} />
              )
              )}
            </SelectField>
            <SelectField floatingLabelText="Type" 
              value={this.state.type} 
              onChange={this.handleChangeType.bind(this)}
              disabled={this.state.target ? false : true}
              selectedMenuItemStyle={{color:'#6653ff'}}>
              {this.state.target &&
                utilities.outputActions.getActionCategoriesForTargetType(this.props.targetsTypes[this.state.target]).map((type) => (
                  <MenuItem value={type} primaryText={type} />
                ))
              }
            </SelectField>
          </div>
          {this.state.invalidName && <div className="red">Please enter a unique name with no spaces</div>}
        </Dialog>
      </div>
    );
  }
}

OutputActionsEdit = connect(
  (state) => (
    {
      outputStore: state.outputStore,
      outputActions: state.outputActions
    }
  )
)(OutputActionsEdit);

export default OutputActionsEdit;
