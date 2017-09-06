import React from 'react';
import store from '../reduxStore';
import unboundActions from '../actions';
import {bindActionCreators} from 'redux';

let actions = bindActionCreators(unboundActions, store.dispatch);

class OutputComponentListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      editing: false,
      expanded: false
    };
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

  handleClickExpand() {
    this.setState({expanded: true});
  }

  handleClickHide() {
    this.setState({expanded: false});
  }

  render() {
    return this.state.editing ? (
      <div className="outputComponentListItem">
        <form className="outputComponentListItemName" onSubmit={this.handleSubmit.bind(this)}>
          <input className="outputComponentListItemInput" onChange={this.handleChange.bind(this)} value={this.props.outputComponent.name}/>
        </form>
        <i className="material-icons" onClick={this.handleCheckClick.bind(this)}>done</i>
      </div>
    ) : (
      <div>
        <div className="outputComponentListItem" onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
          <div className="outputComponentListItemName">{this.props.outputComponent.name}</div>
          {this.state.hover && this.state.expanded && <i className="material-icons" onClick={this.handleClickHide.bind(this)}>keyboard_arrow_up</i>}
          {this.state.hover && !this.state.expanded && <i className="material-icons" onClick={this.handleClickExpand.bind(this)}>keyboard_arrow_down</i>}
          {this.state.hover && <i className="material-icons" onClick={this.handlePencilClick.bind(this)}>mode_edit</i>}
          {this.state.hover && <i className="material-icons" onClick={this.handleClickRemove.bind(this)}>clear</i>}
        </div>
        {this.state.expanded &&
          <div>
            <div>Children:</div>
            {this.props.outputComponent.children.map((child) => (
              <div>{this.props.outputComponents[child].name}</div>
            )
            )}
          </div>
        }
      </div>
    );

  }
}

export default OutputComponentListItem;