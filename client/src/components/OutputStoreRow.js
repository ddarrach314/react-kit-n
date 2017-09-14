import React from 'react';
import unboundActions from '../actions';
import store from '../reduxStore';
import {bindActionCreators} from 'redux';

let actions = bindActionCreators(unboundActions, store.dispatch);

class OutputStoreRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hover: false};
  }

  handleMouseEnter() {
    this.setState({hover: true});
  }

  handleMouseLeave() {
    this.setState({hover: false});
  }

  handleClickEdit() {
    actions.toggleEditStoreModal(this.props.path);
  }

  handleClickDelete() {
    actions.removeOutputStoreProperty(this.props.path);
  }

  render() {
    let divStyle = {
          marginLeft: this.props.indent + 'px'
        };
    
    return this.props.isElementSchema 
      ? (
          <div style={divStyle} 
            className="outputStoreRow" 
            onMouseEnter={this.handleMouseEnter.bind(this)} 
            onMouseLeave={this.handleMouseLeave.bind(this)}>
            <div>Element Type: {this.props.type}</div>
            {this.state.hover && 
              <div>
                <i className="material-icons pointer" onClick={this.handleClickEdit.bind(this)}>mode_edit</i>
              </div>
            }
          </div>
        )
      : (
          <div style={divStyle} 
            className="outputStoreRow"
            onMouseEnter={this.handleMouseEnter.bind(this)} 
            onMouseLeave={this.handleMouseLeave.bind(this)}>
            <div>{this.props.name}: {this.props.type}</div>
            {this.state.hover && 
              <div>
                <i className="material-icons pointer" onClick={this.handleClickEdit.bind(this)}>mode_edit</i>
                <i className="material-icons pointer red" onClick={this.handleClickDelete.bind(this)}>clear</i>
              </div>
            }
          </div>
        )
  }
}

export default OutputStoreRow;