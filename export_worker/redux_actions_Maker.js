//take in as input 'onion' and server out the files needed' 
//may be refactored into multiple files/modules depending on need. 
var _ = require('lodash');

const actionInput = (type, target) => {
  //take in type from action and target
  if (type === 'add') { return 'item'; }
  if (type === 'set') { return 'value'; }
  if (type === 'delete') {
    if (Array.isArray(target)) {
      return 'index';
    } else {
      return 'key';
    }
  }
  if (type === 'setIn') {
    if (Array.isArray(target)) {
      return 'index, value';
    } else {
      return 'key, value';
    }
  }
};

const actionOutput = (type, target) => {
  if (type === 'add') { return 'item'; }
  if (type === 'set') { return 'value'; }
  if (type === 'delete') {
    if (Array.isArray(target)) {
      return 'index';
    } else {
      return 'key';
    }
  }
  if (type === 'setIn') {
    if (Array.isArray(target)) {
      return 'index,\n  value';
    } else {
      return 'key,\n  value';
    }
  }

};

const makeHeader = (types) => {
  let header = '';
  _.forEach(types, (type) => {
    header = header.concat(
      `const ${type} = "${type}";\n`
    );
  });
  return header;
};

const makeExport = (types) => {
  let exp = '\nexport const types = {\n';
  types.forEach((type) => {
    exp = exp.concat(
      `  ${type},\n`
    );
  });
  exp = exp.concat('}\n\n');
  return exp;
};

const createActionJsContent = (onion) => {
  //ingredients: whole onion
  //process: slice onion for actions layer and store
  let store = onion.store;
  let actions = onion.actions;
  let types = [];
  let actionList = [];
  let actionsJs = '/* Actions file */\n\n';
  // pull types out of onion.actions into types array as 'ACTIONTYPE_ACTIONTARGET'
  _.forEach(actions, (action) => {
    //set target reference for actionList
    let target = onion.store[action.target];
    //format the action name to the SNAKE_CASE and push to types array
    let snakeType = _.snakeCase(action.name);
    let type = snakeType.toUpperCase();
    types.push(type);
    // create and save action list to actionList array
    actionList = actionList.concat(`const ${action.name} = (${actionInput(action.type, target)}) => ({\n  type: ${type},\n  ${actionOutput(action.type, target)}\n})\n\n`);
  });
  //stitchs together the header, export and action functions
  actionsJs = actionsJs.concat(makeHeader(types), makeExport(types), actionList);
  
  //create file actions.js in working directory
  
  //write string result to file
  
};
