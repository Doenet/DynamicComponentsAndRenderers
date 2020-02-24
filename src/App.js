import React, { Component } from 'react';
import './App.css';

const componentReg = {
  First: import(/* webpackMode: "lazy", webpackChunkName: "./components/first.js" */ `./components/lessThanThree/First.js`),
  Second: import(/* webpackMode: "lazy", webpackChunkName: "./components/second.js" */ `./components/lessThanThree/Second.js`),
  Third: import(/* webpackMode: "lazy", webpackChunkName: "./components/third.js" */ `./components/Third.js`),
  Fourth: import(/* webpackMode: "lazy", webpackChunkName: "./components/fourth.js" */ `./components/Fourth.js`),
  Fifth: import(/* webpackMode: "lazy", webpackChunkName: "./components/fifth.js" */ `./components/Fifth.js`)
  }
const componentBundleReg = {
  a: {
    import:import(/* webpackMode: "lazy", webpackChunkName: "./components/A.js" */ `./components/AlphabetBundle.js`),
    load:"A",
}
}


class App extends Component {

  constructor(props) {
    super(props);
    
    this.components = [];
    this.componentsNames = [];
   
  }

  loadComponent(componentName) {
    console.log();
    

    if (componentName !== "") {
      
      if (!this.componentsNames.includes(componentName)) {
        console.log(componentName);
        if (Object.keys(componentReg).includes(componentName)){

          // if (componentReg.keys)
          // return import(/* webpackMode: "lazy", webpackChunkName: "./components/[id]" */ `./components/${componentName}.js`).then( component => {
              // return import(/* webpackMode: "lazy", webpackChunkName: "./components/[request]" */ `./components/${componentName}.js`).then( component => {
          return componentReg[componentName].then( component => {
            // return import(/* webpackMode: "eager", webpackChunkName: "./components/[request]" */ `./components/${componentName}.js`).then( component => {

          this.components.push(React.createElement(component.default, {key:componentName}));
          this.componentsNames.push(componentName);
          console.log(`${componentName} loaded.`);
          this.forceUpdate();
        }).catch(error => `Error loading ${componentName}.`);
      }else if (Object.keys(componentBundleReg).includes(componentName)){
        return componentBundleReg[componentName].import.then( component => {
          console.log(component);
          console.log(componentBundleReg[componentName].load);
          
          this.components.push(React.createElement(component[componentBundleReg[componentName].load], {key:componentName}));
          this.componentsNames.push(componentName);
          console.log(`${componentName} loaded.`);
          this.forceUpdate();
          
        }).catch(error => `Error loading ${componentName}.`);
        }else{
        console.log(`No match found for ${componentName}`);
        
      }

      } else {
        console.log(`already added ${componentName}`);
        
      }
    } 
      return null;
    
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Dynamic Import Demo</h1>
        </div>
        <div className="buttons-container">
          <button onClick={() => this.loadComponent("First")}>First</button>
          <button onClick={() => this.loadComponent("Second")}>Second</button>
          <button onClick={() => this.loadComponent("Third")}>Third</button>
          <button onClick={() => this.loadComponent("Fourth")}>Fourth</button>
          <button onClick={() => this.loadComponent("Fifth")}>Fifth</button>
          <button onClick={() => this.loadComponent("a")}>A</button>
        </div>
        <div className="components-container">
          {this.components}
        </div>
      </div>
    );
  }  
}

export default App;
