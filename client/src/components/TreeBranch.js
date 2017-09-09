import React from 'react';
import store from '../reduxStore';
import unboundActions from '../actions';
import {bindActionCreators} from 'redux';
import TreeBranchPropOrAction from './TreeBranchPropOrAction';
import _ from 'lodash';

let actions = bindActionCreators(unboundActions, store.dispatch);

// ACCOUNT FOR USE CASE WHERE USER DISCONNECTS AFTER PROPS HAVE BEEN ADDED

class TreeBranch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      expanded: false,
      connectStoreError: false,
      selectedPropPath: '',
      addedPropName: '',
      selectedAction: '',
      addPropError: false,
      addActionError: false
    };
  }

  handleDragOver(event) {
    event.preventDefault();
  }

  handleDrop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData('text');
    actions.addChildComponent({parent: this.props.id, child: data});
  }

  handleClickExpand() {
    this.setState({expanded: true});
  }

  handleClickHide() {
    this.setState({expanded: false});
  }

  handleMouseEnter() {
    this.setState({hover: true});
  }

  handleMouseLeave() {
    this.setState({hover: false});
  }

  handleClickConnect() {
    if (this.props.connectionCanBeToggled) {
      actions.toggleComponentConnection(this.props.outputPropsKey);
    } else {
      this.setState({connectStoreError: true}, function() {
        setTimeout(this.hideConnectStoreError.bind(this), 1500);
      });
    }
  }

  hideConnectStoreError() {
    this.setState({connectStoreError: false});
  }

  handlePropNameChange(event) {
    this.setState({addedPropName: event.target.value});
  }

  handleSelectPropPath(event) {
    this.setState({selectedPropPath: event.target.value});
  }

  handleClickAddProp() {
    if (this.state.selectedPropPath === '' 
        || this.state.addedPropName === '' 
        || this.props.outputPropNames.includes(this.state.addedPropName.toLowerCase())
    ) {
      this.setState({addPropError: true}, function() {
        setTimeout(this.hideAddPropError.bind(this), 1500);
      });
    } else {
      actions.bindStorePropToComponent(this.props.outputPropsKey, this.state.selectedPropPath, this.state.addedPropName);
      this.setState({selectedPropPath: '', addedPropName: ''});
    }
  }

  hideAddPropError() {
    this.setState({addPropError: false});
  }

  handleSelectAction() {

  }

  handleClickAddAction() {

  }

  componentWillReceiveProps() {

  }

  render() {
    let divStyle = {
      marginLeft: this.props.indent + 'px'
    };
    let underline = this.props.inheritsConnection ? ' blueUnderline' : '';

    return (
      <div>
        <div style={divStyle} className="treeBranchNameRow" onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
          <div className={`treeBranchName${underline}`}
            onDragOver={this.handleDragOver.bind(this)} 
            onDrop={this.handleDrop.bind(this)}>{this.props.name}</div>
          {this.props.outputComponentProps && this.props.outputComponentProps.connected && <i className="material-icons pointer reactBlue" onClick={this.handleClickConnect.bind(this)}>link</i>}
          {this.state.hover && (!this.props.outputComponentProps || !this.props.outputComponentProps.connected) && <i className="material-icons pointer" onClick={this.handleClickConnect.bind(this)}>link</i>}
          {this.state.hover && this.state.expanded && <i className="material-icons pointer" onClick={this.handleClickHide.bind(this)}>keyboard_arrow_up</i>}
          {this.state.hover && !this.state.expanded && <i className="material-icons pointer" onClick={this.handleClickExpand.bind(this)}>keyboard_arrow_down</i>}
          {this.state.connectStoreError && <div className="red">Only connect 1 tree level</div>}
        </div>
        {this.state.expanded && 
          <div>
            <div>
              <div>Props:</div>
              <div className="treeBranchModifyItem">
                <div className="outputPropNameInputLabel">Name:</div>
                <input className="outputPropNameInput" 
                  value={this.state.addedPropName}
                  onChange={this.handlePropNameChange.bind(this)}></input>
                <div>Path:</div>
                <select className="outputPropPathSelect" 
                  value={this.state.selectedPropPath} 
                  onChange={this.handleSelectPropPath.bind(this)}>
                  <option value=''></option>
                  {(this.props.inheritsConnection || this.props.outputComponentProps)
                    && (this.props.inheritsConnection || this.props.outputComponentProps.connected) 
                    && this.props.outputStorePropsOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    )
                    )}
                </select>
                <i className="material-icons pointer green"
                  onClick={this.handleClickAddProp.bind(this)}>add</i>
              </div>
              {this.state.addPropError && <div className="red">Please select a prop path and unique prop name</div>}
              {this.props.outputComponentProps && _.map(this.props.outputComponentProps.storeProps, (storePropName, storePropPath) => (
                <TreeBranchPropOrAction storePropPath={storePropPath} storePropName={storePropName} outputPropsKey={this.props.outputPropsKey}/>
              )
              )}
            </div>
            <div className="treeBranchModifyRow">
              <div>Actions:</div>

              <div className="treeBranchModifyItem">
                <select value={this.state.selectedAction} onChange={this.handleSelectAction.bind(this)}>
                </select>
                <i className="material-icons pointer green"
                  onClick={this.handleClickAddAction.bind(this)}>add</i>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default TreeBranch;