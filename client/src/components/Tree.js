import React from 'react';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

import store from '../reduxStore';
import {connect} from 'react-redux';
import utilities from '../utilities/index';
import TreeBranch from './TreeBranch';
import unboundActions from '../actions';
import TreeBranchPropOrAction from './TreeBranchPropOrAction';

let actions = bindActionCreators(unboundActions, store.dispatch);

class Modal extends React.Component {
  constructor(props) {
    super(props);
    let {
      actions,
      parentProps,
      storeProps
    } = props.editing.component;

    this.state = {
      actions,
      parentProps: [{childProp: '', parentProp: ''}, ...parentProps],
      storeProps: [{propName: '', storeProp: ''}, ...storeProps]
    };

    this.updateActions = this.updateActions.bind(this);
    this.updateProp = this.updateProp.bind(this);
    this.addStoreProp = this.addStoreProp.bind(this);
  }

  addStoreProp() {
    this.setState((state) => ({
      storeProps: [{propName: '', storeProp: ''}, ...state.storeProps]
    }));
  }

  updateProp(index, update, type = 'parentProps') {
    this.setState(state => {
      let oldProp = state[type][index];
      let newProp = _.assign({}. oldProp, update);
      return safeSet(state, newProp, `state.${type}.${index}`);
    });
  }

  updateActions(e, k, payload) {
    this.setState(state => {
      let actionIds = payload;
      let currentActions = state.actions;
      let newActions = _.clone(currentActions);
      for (let actionId of actionIds) {
        if (actionId in newActions) {
          delete newActions[actionId];
        } else {
          newActions[actionId] = actionId;
        }
      }
      return { actions: newActions };
    });
  }

  getConnectedPropsForm() {
    return (
      <div className='col-lg-6'>
        <div style={{display: 'flex'}}>
          <h5>
            Props From Store
          </h5>
          <i
            className="material-icons addButton pointer green"
            onClick={this.addStoreProp}
          >
            add
          </i>
        </div>

        <div style={{display: 'flex'}}>
          <div className='xColumn' >

          </div>
          <div className='propsColumn'>
            <div className='row'>
              {
                this.state.storeProps.map((prop, i) => (
                  <span>
                    <div className='col-6'>
                      <TextField
                        floatingLabelText="Prop Name"
                        floatingLabelStyle={{marginTop: '-18px'}}
                        fullWidth={true}
                        style={{height: '54px'}}
                        inputStyle={{marginTop: '0px'}}
                      />
                    </div>
                    <div className='col-6'>
                      <SelectField
                        floatingLabelText="Store Target"
                        floatingLabelStyle={{marginTop: '-18px'}}
                        style={{height: '54px', marginTop: '0px;'}}
                        inputStyle={{marginTop: '0px'}}
                        fullWidth={true}
                      />
                    </div>
                  </span>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  getInheritedPropsForm() {
    return null;
  }

  render() {
    const dialogActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={actions.closeEditComponentModel}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={actions.closeEditComponentModel}
      />
    ];

    if (this.props.editing) {
      let { actions } = this.state;
      let component = this.props.editing.component;
      let menuItems = this.props.outputActions
        .map((action) => (
          <MenuItem
            key={action.id}
            insetChildren={true}
            checked={action.id in actions}
            value={action.id}
            primaryText={action.name}
          />
        ));

      let actionNames = this.props.outputActions
        .filter(action => action.id in actions)
        .map(action => action.name);

      return (
        <Dialog
          title={`Edit ${component.name}`}
          actions={dialogActions}
          modal={false}
          open={this.props.editing}
          onRequestClose={actions.closeEditComponentModel}
        >
          <div className="row">
            <div className="col-lg-6">
              <h5>
                Actions
              </h5>

              <SelectField
                multiple={true}
                hintText={
                  (_.size(actions) === 0) ?
                    'Select a name' :
                    ''
                }
                values={Object.keys(actions)}
                onChange={this.updateActions}
                selectionRenderer={(values) => {
                  return actionNames.join(', ');
                }}
              >
                {menuItems}
              </SelectField>
            </div>

            {
              component.connected ?
                this.getConnectedPropsForm() :
                this.getInheritedPropsForm()
            }
          </div>

        </Dialog>
      );
    } else {
      return null;
    }
  }
}

class Tree extends React.Component {
  render() {
    return (
      <div className={this.props.colWidth}>
        <h4>App Tree</h4>
        {
          this.props.outputComponents.editing &&
          <Modal
            outputActions={this.props.outputActions.outputActions}
            outputStore={this.props.outputStore.outputStore}
            editing={this.props.outputComponents.editing}
          />
        }

        <div className="tree">
          {
            utilities.tree.generateTreeArray(
              this.props.outputComponents.components,
              this.props.outputActions.outputActions,
              TreeBranch
            )
          }
        </div>
      </div>
    );
  }
}

Tree = connect(
  (state) => ({
    outputComponents: state.outputComponents,
    outputStore: state.outputStore,
    outputActions: state.outputActions
  })
)(Tree);

export default Tree;
