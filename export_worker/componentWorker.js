const _ = require('lodash');

/*  
This module will create the react components, it's will require the following inputs:
  1: Onion object (onion)
  2: working directory to add file to (dir)
  3: callBack to trigger next part of the chain (callBack) 
*/
const importStatement = (key, childName) => {
  if (key === '0') {
    return `import ${childName} from './components/${childName}';\n`;
  } else {
    return `import ${childName} from './${childName}';\n`;
  }
};

const classStatement = (name) => {
  return `/* Add additional import statements as needed for your app! */\n\nclass ${name} extends React.Component {\n`;
};

const methodStatement = () => {
  //constructs the methods for the component
  return `\n  /* add component methods here */\n`;
};

const renderChild = (key, childName) => {
  //returns the string for the child component to be rendered.
  if (key === '0') {
    return `        <${childName} props={/*FILL_ME_IN*/}/>\n`;
  } else {
    return `      <${childName} props={/*FILL_ME_IN*/}/>\n`;
  }
};

const storeConnect = () => {
  //called if the component is connected to the redux store
};

const exportStatement = (key, compName) => {
  //returns the export statement for all child components
  //or render statement for app.jsx
  if (key === '0') {
    return `\n\nReactDOM.render(<${compName} />, document.getElementById('root'));\n`;
  } else {
    return `\n\nexport default ${compName};\n`; 
  }
};

const createComponent = (key, onion) => {
  //for the given key of a given component,  
  //compose the contents of that component and return the string of it's contents
  let component = onion.components[key];
  let compName = _.upperFirst(component.name); //component's name
  let compChildren = component.children; //array of components children
  let compJsxTemplate = `/* ${compName} Component File */\n\n`;

  let appHead = 'import React from \'react\';\nimport ReactDOM from \'react-dom\';\nimport { Provider } from \'react-redux\';\nimport store from \'./store\';\n';

  let compHead = 'import React from \'react\';\nimport { connect } from \'react-redux\';\nimport store from \'../store\';\n';  

  let appRenderTemplate = '  render() {\n    return (\n      <Provider store={store}>\n        {/*Space for wrapping HTML if needed */}\n';

  let appRenderTemplateEnd = '        {/*Space for wrapping HTML if needed */}\n      </Provider>\n    );\n  };\n};';

  let compRenderTemplate = '  render() {\n    return (\n      {/*Space for wrapping HTML if needed */}\n';
  let compRenderTemplateEnd = '      {/*Space for wrapping HTML if needed */}\n    );\n  };\n};';

  if (compChildren.length) {
    _.forEach(compChildren, (childObj) => {
      let childName = _.upperFirst(onion.components[childObj.componentId].name);
      if (key === '0') {
        appHead += importStatement(key, childName);
        appRenderTemplate += renderChild(key, childName);
      } else {
        compHead += importStatement(key, childName);
        compRenderTemplate += renderChild(key, childName);
      }
    });
  }

  if (key === '0') {
    return compJsxTemplate + appHead + classStatement(compName) + methodStatement() + appRenderTemplate + appRenderTemplateEnd + exportStatement(key, compName);
  } else {
    return compJsxTemplate + compHead + classStatement(compName) + methodStatement() + compRenderTemplate + compRenderTemplateEnd + exportStatement(key, compName);
  }
};

module.exports.createComponent = createComponent;