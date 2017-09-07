const archiver = require('archiver');
const Promise = require('bluebird');
const reducer = require('./reducersMaker.js');
const action = require('./actionsMaker.js');
const store = require('./storeMaker.js');
const comp = require('./componentWorker.js');
const path = require('path');
const fs = require('fs');
Promise.promisifyAll(fs);
const _ = require('lodash');


/*  

compose the various needed components together in the same directory and package for sending back to client that requested the package

1. create main folder (client > src )
  2. create actions folder (src > actions)
  3. create reducers folder (src > reducers)
  4. create components folder (src > components)
5. create actions.js in actions
6. create reducers.js in reducers
7. create store.js in main
8. create app.js in main 
9. create components in components

10. handle errors
11. package (zip?) folder and send to requestor. 

//potentialy refactor the workers to just be string factories and leave the file creation to composer... 
*/

//res header should be set to 'Content-Type':'application/zip' prior to invoking this function
const composer = (req, res) => {
  //pull the onion out of the req object
  
  //easy ref vars
  const mainDir = '/client/src/';
  const compDir = mainDir + 'components/';
  //setup the zip file  and output
  let zipKit = archiver('zip',{
    zlib: { level: 9 }
  });

  zipKit.on('warning', (err) => {
    if(err.code === 'ENONET') {
      console.log('zipKit warning', err);
    } else {
      throw err;
    }
  });

  zipKit.on('error', (err) => {
    throw err;
  });

  res.on('close', () => {
    console.log(zipKit.pointer() + 'total bytes');
    console.log('zipKit finished, and file sent to user!');
  });

  zipKit.pipe(res);

  //append/create files in the zipKit stream
  zipKit.append(action.createActionJs(onion), {
    name:'actions.js',
    prefix: mainDir
  });

  zipKit.append(reducer.createReducersJs(onion), {
    name: 'reducer.js',
    prefix: mainDir
  });

  zipKit.append(store.createStoreJs(), {
    name: 'store.js',
    prefix: mainDir
  });
  
  _.forEach(onion.components, (component, key) => {
    let compName = _.upperFirst(component.name) + '.jsx';
    let thisDir = key === 0 ? mainDir : compDir;
    zipKit.append(comp.createComponent(key, onion), {
      name: compName,
      prefix: thisDir
    });
  });

  zipKit.finalize();
}

module.exports.composer = composer;
