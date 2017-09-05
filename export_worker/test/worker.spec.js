const expect = require('chai').expect;
const action = require('../actionsMaker.js');
const reducer = require('../reducersMaker.js');
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
    }
  };
  let actionOutput = 
    `/* Actions file */\n\nconst ADD_TODO = "ADD_TODO";\nconst DELETE_TODO = "DELETE_TODO";\nconst SET_TODO = "SET_TODO";\nconst SET_USERNAME = "SET_USERNAME";\n\nexport const types = {\n  ADD_TODO,\n  DELETE_TODO,\n  SET_TODO,\n  SET_USERNAME,\n}\n\nexport const addTodo = (item) => ({\n  type: ADD_TODO,\n  item\n})\n\nexport const deleteTodo = (index) => ({\n  type: DELETE_TODO,\n  index\n})\n\nexport const setTodo = (index, value) => ({\n  type: SET_TODO,\n  index,\n  value\n})\n\nexport const setUsername = (value) => ({\n  type: SET_USERNAME,\n  value\n})\n\n`;

  let reducersOutput = 
    `/* Reducers File */\n\nimport { types } from './actions'\n\nconst INITIAL_STATE = store;\n\nconst reducer = (state = INITIAL_STATE, action) => {\n  switch (action.type) {\n\n    case types.ADD_TODO:\n      let state = _.cloneDeep(state);\n      state.todos.push(action.item);\n      return state;\n    case types.DELETE_TODO:\n      let state = _.cloneDeep(state);\n      state.todos.splice(index, 1);\n      return state;\n    case types.SET_TODO:\n      let state = _.cloneDeep(state);\n      state.todos[action.index] = action.value;\n      return state;\n    case types.SET_USERNAME:\n      let state = _.cloneDeep(state);\n      state.username = action.value;\n      return state;\n    default:\n      return state;\n  };\n};\n\nexport default reducer\n`;

  let curDir = path.join(__dirname, '../');
  const { sep } = require('path');
  let testFolder = fs.mkdtempSync(`${curDir}${sep}`, );
  let actionJs = path.join(testFolder, 'actions.js');
  let reducersJs = path.join(testFolder, 'reducers.js');

  before((done) => {
    action.createActionJs(onion, testFolder, () => {
      reducer.createReducersJs(onion, testFolder, done);
    });
  });

  after((done) => {
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
  })
})