const expect = require('chai').expect;
const action = require('../actionsMaker.js');
const reducer = require('../reducersMaker.js');
const store = require('../storeMaker.js');
const app = require('../appMaker.js');
const fs = require('fs');
const path = require('path');


describe('file creators', () => {
  let onion = {
    store: {
      todos: [],
      username: null
    },
    actions: {
      1: {
        name: 'addTodo',
        type: 'add',
        target: 'todos'
      },
      2: {
        name: 'deleteTodo',
        type: 'delete',
        target: 'todos'
      },
      3: {
        name: 'setTodo',
        type: 'setIn',
        target: 'todos'
      },
      4: {
        name: 'setUsername',
        type: 'set',
        target: 'username'
      }
    },
    components: {
      1: {
        name: 'componentName',
        children: [2, 3, 4]
      },
  
      2: {
        name: 'exampleChild',
        children: []
      },
  
      3: {
        name: 'exampleChild2',
        children: [5]
      },
  
      4: {
        name: 'exampleChildList',
        children: []
      },
  
      5: {
        name: 'exampleChildOfChild',
        children: []
      }
    },
  };
  let actionOutput = 
    `/* Actions file */\n\nconst ADD_TODO = "ADD_TODO";\nconst DELETE_TODO = "DELETE_TODO";\nconst SET_TODO = "SET_TODO";\nconst SET_USERNAME = "SET_USERNAME";\n\nexport const types = {\n  ADD_TODO,\n  DELETE_TODO,\n  SET_TODO,\n  SET_USERNAME,\n}\n\nexport const addTodo = (item) => ({\n  type: ADD_TODO,\n  item\n})\n\nexport const deleteTodo = (index) => ({\n  type: DELETE_TODO,\n  index\n})\n\nexport const setTodo = (index, value) => ({\n  type: SET_TODO,\n  index,\n  value\n})\n\nexport const setUsername = (value) => ({\n  type: SET_USERNAME,\n  value\n})\n\n`;

  let reducersOutput = 
    `/* Reducers File */\n\nimport { types } from './actions'\n\nconst INITIAL_STATE = store;\n\nconst reducer = (state = INITIAL_STATE, action) => {\n  switch (action.type) {\n\n    case types.ADD_TODO:\n      let state = _.cloneDeep(state);\n      state.todos.push(action.item);\n      return state;\n    case types.DELETE_TODO:\n      let state = _.cloneDeep(state);\n      state.todos.splice(index, 1);\n      return state;\n    case types.SET_TODO:\n      let state = _.cloneDeep(state);\n      state.todos[action.index] = action.value;\n      return state;\n    case types.SET_USERNAME:\n      let state = _.cloneDeep(state);\n      state.username = action.value;\n      return state;\n    default:\n      return state;\n  };\n};\n\nexport default reducer;\n`;

  let storeOutput = 
    `/* Store File */\n\nimport { createStore } from 'redux';\nimport reducer from './reducers';\n\nconst store = createStore(reducer);\n\nexport default store;\n`;
  
  
  let appOutput = 
    `/* Main App File */\n\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport { Provider } from 'react-redux';\nimport store from './store';\nimport exampleChild from './components/exampleChild';\nimport exampleChild2 from './components/exampleChild2';\nimport exampleChildList from './components/exampleChildList';\n/* Add additional import statements as needed for your app! */\n\nclass App extends React.Component {\n\n  /* add component methods here */\n  render() {\n    return (\n      <Provider store={store}>\n        {/*Space for wrapping HTML if needed */}\n        <exampleChild props={/*FILL_ME_IN*/}/>\n        <exampleChild2 props={/*FILL_ME_IN*/}/>\n        <exampleChildList props={/*FILL_ME_IN*/}/>\n        {/*Space for wrapping HTML if needed */}\n      </Provider>\n    );\n  };\n};\n\nReactDOM.render(<App />, document.getElementById('root'));\n`;
  let curDir = path.join(__dirname, '../');
  const { sep } = require('path');
  let testFolder = fs.mkdtempSync(`${curDir}${sep}`, );
  let actionJs = path.join(testFolder, 'actions.js');
  let reducersJs = path.join(testFolder, 'reducers.js');
  let storeJs = path.join(testFolder, 'store.js');
  let appJsx = path.join(testFolder, 'app.jsx');

  before((done) => {
    action.createActionJs(onion, testFolder, () => {
      reducer.createReducersJs(onion, testFolder, () => {
        store.createStoreJs(testFolder, () => {
          app.createAppJsx(onion, testFolder, done);
        });
      });
    });
  });

  after((done) => {
    fs.unlinkSync(storeJs);
    fs.unlinkSync(appJsx);
    fs.unlinkSync(actionJs);
    fs.unlinkSync(reducersJs);
    fs.rmdir(testFolder, done);
  });

  it(`created an Action.js file in ${testFolder} directory`, (done) => {
      expect(fs.existsSync(actionJs)).to.be.true;
      done();
  });

  it('contents of actions.js are correct', (done) => {
    expect(fs.readFileSync(actionJs, 'utf-8')).to.equal(actionOutput);
    done();
  });

  it(`creates a reducer.js file in ${testFolder}`, (done) => {
    expect(fs.existsSync(reducersJs)).to.be.true;
    done();
  });

  it(`contents of reducers.js are correct`, (done) => {
    expect(fs.readFileSync(reducersJs, 'utf-8')).to.equal(reducersOutput);
    done();
  });

  it(`creates a store.js file in ${testFolder}`, (done) => {
    expect(fs.existsSync(storeJs)).to.be.true;
    done();
  });

  it(`contents of store.js are correct`, (done) => {
    expect(fs.readFileSync(storeJs, 'utf-8')).to.equal(storeOutput);
    done();
  });

  it(`creates a app.jsx file in ${testFolder}`, (done) => {
    expect(fs.existsSync(appJsx)).to.be.true;
    done();
  });

  it(`contents of app.jsx are correct`, (done) => {
    expect(fs.readFileSync(appJsx, 'utf-8')).to.equal(appOutput);
    done();
  });
})