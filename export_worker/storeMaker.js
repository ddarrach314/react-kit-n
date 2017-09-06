const fs = require('fs');
const path = require('path');


/*  function creates the store.js file

takes as input the main directory folder & a callback
*/

const createStoreJs = (dir, cb) => {
 let storeJs = 
  `/* Store File */\n\nimport { createStore } from 'redux';\nimport reducer from './reducers';\n\nconst store = createStore(reducer);\n\nexport default store;\n`;

  fs.writeFile(path.join(dir, 'store.js'), storeJs, (err) => {
    if (err) { throw err; }
    cb();
  });
  //refactor to return the string instead for composer to build all the files.
    //will not need inputs in current itteration if simply returning a default string 
  //return storeJs;
};

module.exports.createStoreJs = createStoreJs;