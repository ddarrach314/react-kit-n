import React from 'react';

class OutputComponentListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: props.name,
      hover: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePencilClick = this.handlePencilClick.bind(this);
    this.handleCheckClick = this.handleCheckClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({editing: false});
  }

  handleChange(event) {
    this.setState({name: event.target.value});
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

  render() {
    return this.state.editing ? (
      <div className="outputComponentListItem">
        <form className="outputComponentListItemName" onSubmit={this.handleSubmit}>
          <input className="outputComponentListItemInput" onChange={this.handleChange} value={this.state.name}/>
        </form>
        <i className="material-icons" onClick={this.handleCheckClick}>done</i>
      </div>
    ) : (
      <div className="outputComponentListItem" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <div className="outputComponentListItemName">{this.state.name}</div>
        {this.state.hover && <i className="material-icons" onClick={this.handlePencilClick}>mode_edit</i>}
      </div>
    );

  }
}

export default OutputComponentListItem;