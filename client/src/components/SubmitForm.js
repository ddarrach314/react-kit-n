import React from 'react';
import {connect} from 'react-redux';

class SubmitForm extends React.Component {
  render() {
    let {actions, store, components} = this.props;
    return (
      <form className='submitForm' action='/download' method='get'>
        <input
          type='hidden'
          name='onion'
          value={JSON.stringify({actions, store, components})}
        />
        <button className='pointer button btn btn-lg btn-primary btn-block'> Export Application </button>
      </form>
    );
  }
}

SubmitForm = connect(
  (state) => ({
    actions: state.outputActions.outputActions,
    store: state.outputStore.outputStore,
    components: state.outputComponents.components
  })
)(SubmitForm);

export default SubmitForm;
