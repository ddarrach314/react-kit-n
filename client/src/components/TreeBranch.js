import React from 'react';
import store from '../reduxStore';
import unboundActions from '../actions';
import {bindActionCreators} from 'redux';

let actions = bindActionCreators(unboundActions, store.dispatch);

class TreeBranch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      expanded: false,
      outputStoreConnection: false
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
    this.setState({outputStoreConnection: !this.state.outputStoreConnection});
  }

  render() {
    let divStyle = {
      marginLeft: this.props.indent + 'px'
    };
    return (
      <div>
        <div style={divStyle} className="treeBranchNameRow" onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
          <div className="treeBranchName"
            onDragOver={this.handleDragOver.bind(this)} 
            onDrop={this.handleDrop.bind(this)}>{this.props.name}</div>
          {this.state.outputStoreConnection && <i className="material-icons pointer reactBlue" onClick={this.handleClickConnect.bind(this)}>link</i>}
          {this.state.hover && !this.state.outputStoreConnection && <i className="material-icons pointer" onClick={this.handleClickConnect.bind(this)}>link</i>}
          {this.state.hover && this.state.expanded && <i className="material-icons pointer" onClick={this.handleClickHide.bind(this)}>keyboard_arrow_up</i>}
          {this.state.hover && !this.state.expanded && <i className="material-icons pointer" onClick={this.handleClickExpand.bind(this)}>keyboard_arrow_down</i>}
        </div>
        {this.state.expanded && 
          <div>
            <div>Props:</div>
            <div>Actions:</div>
          </div>
        }
      </div>
    );
  }
}

export default TreeBranch;