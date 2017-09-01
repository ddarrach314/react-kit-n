import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import reducer from './reducers';
import store from './reduxStore';
import StoreForm from './components/StoreForm';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World from React</h1>
        <StoreForm />
      </div>
    );
  }
}

const ConnectedApp = () => {
  return (
    <Provider store={store}>
      <StoreForm />
    </Provider>
  );
};

ReactDOM.render(<ConnectedApp />, document.getElementById('root'));
