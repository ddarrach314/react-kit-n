import React from 'react';
import store from '../reduxStore';
import unboundActions from '../actions';
import {bindActionCreators} from 'redux';

let actions = bindActionCreators(unboundActions, store.dispatch);

class OutputComponentListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      hover: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePencilClick = this.handlePencilClick.bind(this);
    this.handleCheckClick = this.handleCheckClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({editing: false});
  }

  handleChange(event) {
    actions.updateComponent(this.props.id, {name: event.target.value});
  }

  handlePencilClick() {
    this.setState({editing: true});
  }

  handleCheckClick() {
    this.setState({editing: false});
  }

  handleMouseEnter() {
    this.setState({hover: true});
  }

  handleMouseLeave() {
    this.setState({hover: false});
  }

  handleClickRemove() {
    actions.removeComponent(this.props.id);
  }

  render() {
    return this.state.editing ? (
      <div className="outputComponentListItem">
        <form className="outputComponentListItemName" onSubmit={this.handleSubmit}>
          <input className="outputComponentListItemInput" onChange={this.handleChange} value={this.props.outputComponent.name}/>
        </form>
        <i className="material-icons" onClick={this.handleCheckClick}>done</i>
      </div>
    ) : (
      <div className="outputComponentListItem" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <div className="outputComponentListItemName">{this.props.outputComponent.name}</div>
        {this.state.hover && <i className="material-icons" onClick={this.handlePencilClick}>mode_edit</i>}
        {this.state.hover && <i className="material-icons" onClick={this.handleClickRemove}>delete</i>}
      </div>
    );

  }
}

export default OutputComponentListItem;