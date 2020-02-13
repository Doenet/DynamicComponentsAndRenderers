import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      first: null,
      second: null,
      third: null
     };
  }

  loadComponent(componentId) {
    if (componentId === "First") {
      if (this.state.first === null) {
        return import("./First.js").then( component => {
          this.setState({first: React.createElement(component.default)});
          console.log("First loaded.");
        }).catch(error => "Error loading First.");
      } else {
        this.setState({first: null});
      }
    } else if (componentId === "Second") {
      return import("./Second.js").then( component => {
        this.setState({second: React.createElement(component.default)});
        console.log("Second loaded.");
      }).catch(error => "Error loading Second.");
    } else if (componentId === "Third") {
      return import("./Third.js").then( component => {
        this.setState({third: React.createElement(component.default)});
        console.log("Third loaded.");
      }).catch(error => "Error loading Third.");;
    } else {

    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <div className="header">
          <h1>Dynamic Import Demo</h1>
        </div>
        <div className="buttons-container">
          <button onClick={() => this.loadComponent("First")}>First</button>
          <button onClick={() => this.loadComponent("Second")}>Second</button>
          <button onClick={() => this.loadComponent("Third")}>Third</button>
        </div>
        <div className="components-container">
          {this.state.first}
          {this.state.second}
          {this.state.third}
        </div>
      </div>
    );
  }  
}

export default App;
