import React from 'react';
import unboundActions from '../actions';
import store from '../reduxStore';
import {bindActionCreators} from 'redux';

let actions = bindActionCreators(unboundActions, store.dispatch);

class OutputStoreRow extends React.Component {

  render() {
    let divStyle = {
          marginLeft: this.props.indent + 'px'
        };
    
    return (
      <div>
      </div>
    );
  }
}

export default OutputStoreRow;