import React from 'react';

class OutputComponentListItem extends React.Component {
  render() {
    return (
      <div className="outputComponentListItem">
        <div>{this.props.name}</div>
        <i className="material-icons">mode_edit</i>
      </div>
    );
  }
}

export default OutputComponentListItem;