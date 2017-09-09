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

//res header should be set to 'Content-Type':'application/zip' prior to invoking this function
const composer = (req, res) => {
  //pull the onion out of the req object
  let onion =  req.body;
  //easy ref vars
  const mainDir = '/client/src/';
  const compDir = mainDir + 'components/';
  //setup the zip file  and output
  let zipKit = archiver('zip'); //,{zlib: { level: 9 }}

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
    let thisDir = key === '0' ? mainDir : compDir;
    zipKit.append(comp.createComponent(key, onion), {
      name: compName,
      prefix: thisDir
    });
  });

  zipKit.finalize();
}

module.exports.composer = composer;
