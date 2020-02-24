import React, { Component } from 'react';
import './App.css';
import { componentReg } from './Reg';



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
          return import(/* webpackMode: "lazy", webpackChunkName: "./components/[request]" */ `./bundles/${importPath}`).then(bundle => {
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
          <button onClick={() => this.loadComponent("dog")}>Dog</button>
        </div>
        <div className="components-container">
          {this.components}
        </div>
      </div>
    );
  }  
}

export default App;
