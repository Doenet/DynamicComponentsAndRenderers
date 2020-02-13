import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.components = [];
    this.componentsNames = [];
   
  }

  loadComponent(componentName) {

    if (componentName !== "") {
      
      if (!this.componentsNames.includes(componentName)) {
        return import(`./components/${componentName}.js`).then( component => {
          // this.components.push(<Component />);
          this.components.push(React.createElement(component.default, {key:componentName}));
          this.componentsNames.push(componentName);
          console.log(`${componentName} loaded.`);
          this.forceUpdate();
        }).catch(error => `Error loading ${componentName}.`);
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
        </div>
        <div className="components-container">
          {this.components}
        </div>
      </div>
    );
  }  
}

export default App;
