import React from 'react';
import OutputComponentListItem from './OutputComponentListItem';
import _ from 'lodash';

class OutputComponentList extends React.Component {
  render() {
    return (
      <div className="col-sm-2 outputComponentsCol">
        <h2>Components</h2>
        <div className="outputComponents">
          {_.map(this.props.outputComponents, (outputComponent) => (
            <OutputComponentListItem name={outputComponent.name} />
          )
          )}
        </div>
      </div>
    );
  }
}

export default OutputComponentList;
