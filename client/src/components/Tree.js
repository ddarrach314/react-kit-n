import React from 'react';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import store from '../reduxStore';
import utilities from '../utilities/index';
import TreeBranch from './TreeBranch';
import unboundActions from '../actions';
import TreeBranchPropOrAction from './TreeBranchPropOrAction';

let actions = bindActionCreators(unboundActions, store.dispatch);

class Tree extends React.Component {
  getDialog () {
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

    return (
      <Dialog
        title="Dialog With Actions"
        actions={dialogActions}
        modal={false}
        open={this.props.editing}
        onRequestClose={actions.closeEditComponentModel}
      >
      </Dialog>
    );
  }

  render() {
    return (
      <div className="col-lg-8 treeCol">
        <h4>App Tree</h4>
        { this.getDialog() }
        <div className="tree">
          {utilities.tree.generateTreeArray(
            this.props.outputComponents,
            Object.keys(utilities.outputStore.getTargetsFromOutputStore(this.props.outputStore)),
            this.props.outputActions,
            TreeBranch
          )}
        </div>
      </div>
    );
  }
}

export default Tree;
