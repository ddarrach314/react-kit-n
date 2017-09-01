import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers';
import StoreForm from './components/StoreForm';

const store = createStore(reducer);

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
      <App />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
