import React, { Component } from 'react';
import './App.css';

// componentName:[import Where it's going Where to find the component,What it's named in the file]
const componentReg = {


  second: ['Bundles/NumberBundle.js','Second'],
  // third: ['/Bundles/NumberBundle.js','TheThirdOne'],
  fourth: ['Bundles/NumberBundle.js','Fourth'],
  a: ['Bundles/AlphabetBundle.js','A'],
  // b: [import(/* webpackMode: "lazy", webpackChunkName: "./components/AlphabetBundle.js" */ './components/Bundles/AlphabetBundle.js'),'B'],
  }


class App extends Component {

  constructor(props) {
    super(props);
    
    this.components = [];
    this.componentsNames = [];
   
  }

  loadComponent(componentName) {

   

    if (!this.componentsNames.includes(componentName)) {
      console.log(`Attempting: ${componentName}`);
      if (Object.keys(componentReg).includes(componentName)){
        let importPath = componentReg[componentName][0];
        let exportName = componentReg[componentName][1]
        console.log(importPath);
        console.log(exportName);
          return import(/* webpackMode: "lazy", webpackChunkName: "./components/[request]" */ `./components/${importPath}`).then(bundle => {
    //     return importExp.then( bundle => {
          
          this.components.push(React.createElement(bundle[exportName], {key:componentName}));
          this.componentsNames.push(componentName);
          console.log(`${componentName} loaded.`);
          this.forceUpdate();
        }).catch(error => `Error loading ${componentName}.`);
      }else{
      console.log(`No match found for ${componentName}`);
      }
    }
  }
      

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Dynamic Import Demo</h1>
        </div>
        <div className="buttons-container">
          <button onClick={() => this.loadComponent("first")}>First</button>
          <button onClick={() => this.loadComponent("second")}>Second</button>
          <button onClick={() => this.loadComponent("third")}>Third</button>
          <button onClick={() => this.loadComponent("fourth")}>Fourth</button>
          <button onClick={() => this.loadComponent("a")}>A</button>
          <button onClick={() => this.loadComponent("b")}>B</button>
        </div>
        <div className="components-container">
          {this.components}
        </div>
      </div>
    );
  }  
}

export default App;
