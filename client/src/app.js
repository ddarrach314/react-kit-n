import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import reducer from './reducers';
import store from './reduxStore';
import OutputStoreForm from './components/OutputStoreForm';
import OutputActionsForm from './components/OutputActionsForm';
import Tree from './components/Tree';
import OutputComponentList from './components/OutputComponentList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const sampleOutputComponents = {
  '0': {
    name: 'App',
    children: ['1', '3']
  },
  '1': {
    name: 'Child1',
    children: ['4']
  },
  '3': {
    name: 'Child2',
    children: []
  },
  '4': {
    name: 'Grandchild1',
    children: []
  }
};

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
            <OutputComponentList outputComponents={sampleOutputComponents}/>
            <Tree outputComponents={sampleOutputComponents}/>
            <OutputStoreForm />
            <OutputActionsForm />
          </div>
        </div>
      </MuiThemeProvider>
    </Provider>
  );
};

ReactDOM.render(<ConnectedApp />, document.getElementById('root'));
