const expect = require('chai').expect;
const action = require('../actionsMaker.js');
const fs = require('fs');
const path = require('path');


describe('Action.js file creator', () => {
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
  let sampleOutput = `/* Actions file */\n\nconst ADD_TODO = "ADD_TODO";\nconst DELETE_TODO = "DELETE_TODO";\nconst SET_TODO = "SET_TODO";\nconst SET_USERNAME = "SET_USERNAME";\n\nexport const types = {\n  ADD_TODO,\n  DELETE_TODO,\n  SET_TODO,\n  SET_USERNAME,\n}\n\nexport const addTodo = (item) => ({\n  type: ADD_TODO,\n  item\n})\n\nexport const deleteTodo = (index) => ({\n  type: DELETE_TODO,\n  index\n})\n\nexport const setTodo = (index, value) => ({\n  type: SET_TODO,\n  index,\n  value\n})\n\nexport const setUsername = (value) => ({\n  type: SET_USERNAME,\n  value\n})\n\n`;

  let curDir = path.join(__dirname, '../');
  const { sep } = require('path');
  let testFolder = fs.mkdtempSync(`${curDir}${sep}`, );
  let actionJs = path.join(testFolder, 'actions.js');

  before((done) => {
    action.createActionJsContent(onion, testFolder, done);
  });

  after((done) => {
    //fs.unlinkSync(actionJs)
    //fs.rmdir(testFolder, done);
  });

  it(`created an Action.js file in ${testFolder} directory`, (done) => {
      expect(fs.existsSync(actionJs)).to.be.true;
      done();
  });

  it('contents of actions.js are correct', (done) => {
    expect(fs.readFileSync(actionJs, 'utf-8')).to.equal(sampleOutput);
    done();
  }
  )
})