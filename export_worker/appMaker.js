// const _ = require('lodash');
// const fs = require('fs');
// const path = require('path');

// /* 
// This module will create App.js
// typically this file is separated from the rest of the client components in the directory

// inputs are expected to be:
//   1. Onion object (onion)
//   2. working directory to write the file into (dir)
//   3. callback to trigger next part of chain(cb)
// */

// //helper functions!!

// const importChild = (childName) => {
//   return `import ${childName} from './components/${childName}';\n`;
// };

// //not part of mvp implementation
// const propsSection = (/*...*/) => {
//   return `\n  /* add component methods here */\n`
// };

// const renderChild = (childName) => {
//   // returns 
//   return `        <${childName} props={/*FILL_ME_IN*/}/>\n`;
// };
// //main function :

// const createAppJsx = (onion, dir, cb) => {
//   //within the onion the first property of 'components'  will always be the app.js component
//   let appChildren = onion.components[1].children; //this will bet he array of children for app.js
//   let appJsx = `/* Main App File */\n\n`;
//   let header = `import React from 'react';\nimport ReactDOM from 'react-dom';\nimport { Provider } from 'react-redux';\nimport store from './store';\n`;

//   let renderFunc = `  render() {\n    return (\n      <Provider store={store}>\n        {/*Space for wrapping HTML if needed */}\n`;

//   let appJsClosing = `};\n\nReactDOM.render(<App />, document.getElementById('root'));\n`

//   if (appChildren && appChildren.length > 0) {
//     for (var i = 0; i < appChildren.length; i++) {
//       let childName = onion.components[appChildren[i]].name;
//       header = header.concat(importChild(childName));
//       renderFunc = renderFunc.concat(renderChild(childName));
//     }
//   }

//   //closing pieces of header section:
//   header = header.concat(`/* Add additional import statements as needed for your app! */\n\nclass App extends React.Component {\n`);
  
//   //closing pieces of renderFunc:
//   renderFunc = renderFunc.concat(`        {/*Space for wrapping HTML if needed */}\n      </Provider>\n    );\n  };\n`);

//   appJsx = appJsx.concat(header, propsSection(), renderFunc, appJsClosing);

//   fs.writeFile(path.join(dir, 'app.jsx'), appJsx, (err) => {
//     if (err) { throw err ;};
//     cb();
//   })

// };

// module.exports.createAppJsx = createAppJsx;