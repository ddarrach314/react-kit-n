const _ = require('lodash');
const fs = require('fs');
const path = require('path');

/*  
This module will create the reducers file  main function will require the following inputs:
  1: Onion object (onion)
  2: working directory to add file to (dir)
  3: callBack to trigger next part of the chain (callBack) 
*/

const caseMaker = (action, target) => {
  //for each action type we create a new case in the reducer fuction
  let snakeType = _.snakeCase(action.name);
  let type = snakeType.toUpperCase();
  let result = `\n    case types.${type}:\n      let state = _.cloneDeep(state);\n`;
  if (action.type === 'set') {
    //for set we will set the target to the new value
    result = result.concat(`      state.${action.target} = action.value;\n      return state;`);
  }
  if (action.type === 'add') {
    //for add we will be pushing the new item into an existing state array
    result = result.concat(`      state.${action.target}.push(action.item);\n      return state;`);
  }
  if (action.type === 'setIn') {
    //for setIn we will be setting the new item in either an array or object
    let prop;
    Array.isArray(target) ? prop = 'index' : prop = 'key';
    result = result.concat(`      state.${action.target}[action.${prop}] = action.value;\n      return state;`);
  }
  if (action.type === 'delete') {
    //delete for arrays and objects 
    if (Array.isArray(target)) {
      result = result.concat(`      state.${action.target}.splice(index, 1);\n      return state;`);
    } else {
      result = result.concat(`      delete state.${action.target}[key];\n      return state;`);
    }
  }
  //future need for custom action delivery with /*FILL_ME_IN*/ for the case
  return result;
};

const createReducersJs = (onion, dir, cb) => {
  let store = onion.store;
  let actions = onion.actions;

  let reducersJs = '/* Reducers File */\n\nimport { types } from \'./actions\'\n\nconst INITIAL_STATE = store;\n\nconst reducer = (state = INITIAL_STATE, action) => {\n  switch (action.type) {\n';
  _.forEach(actions, (action) => {
    /*for each action in the onion we pass the action, key, and target to caseMaker, 
    which will return the populated custom string for that case */
    let target = store[action.target];
    reducersJs = reducersJs.concat(caseMaker(action, target));
  });

  let defaultAndExport = '\n    default:\n      return state;\n  };\n};\n\nexport default reducer;\n';
  //zip everything together and create file!!! 
  reducersJs = reducersJs.concat(defaultAndExport);

  fs.writeFile(path.join(dir, 'reducers.js'), reducersJs, (err) => {
    if (err) { throw err; }
    cb();
  });
};

module.exports.createReducersJs = createReducersJs;