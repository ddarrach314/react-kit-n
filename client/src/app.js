import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers';

const store = createStore(reducer);

class App extends React.Component {
  render() {
    return (
      <h1>Hello World from React</h1>
    );
  }
}

const ConnectedApp = () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
};

ReactDOM.render(<h1>Hello World from React</h1>, document.getElementById('root'));
