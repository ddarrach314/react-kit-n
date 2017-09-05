import React from 'react';

class TreeBranch extends React.Component {
  render() {
    let divStyle = {
      marginLeft: this.props.indent + 'px'
    };
    return (
      <div style={divStyle}>{this.props.name}</div>
    );
  }
}

export default TreeBranch;