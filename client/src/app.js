import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import reducer from './reducers';
import store from './reduxStore';
import OutputComponentList from './components/OutputComponentList';
import Tree from './components/Tree';
import OutputStoreForm from './components/OutputStoreForm';
import OutputActionsForm from './components/OutputActionsForm';
import SubmitForm from './components/SubmitForm';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World from React</h1>
        <OutputStoreForm />
      </div>
    );
  }
}

const ConnectedApp = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <div className="container">
          <nav className="navbar navbar-custom">
            <h1 className="navbar-brand">
              <a href="" className="navbar-brand">Redux-Kit-N</a>
            </h1>
          </nav>
          <div className="row no-gutters pageContent">
            <OutputComponentList />
            <Tree />
            <OutputStoreForm />
            <OutputActionsForm />
          </div>
          <SubmitForm />
        </div>
      </MuiThemeProvider>
    </Provider>
  );
};

ReactDOM.render(<ConnectedApp />, document.getElementById('root'));
