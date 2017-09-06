import React from 'react';
import OutputComponentListItem from './OutputComponentListItem';
import _ from 'lodash';

class OutputComponentList extends React.Component {
  render() {
    return (
      <div className="col-md-4 outputComponentsCol">
        <div className="outputComponentsHeading">
          <h3>Components</h3>
          <i className="material-icons addComponentButton">library_add</i>
        </div>
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
