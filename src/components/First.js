import React from 'react';
import {number} from './subdir/number';

class First extends React.Component {
  constructor(props){
    super(props);



    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    console.log(`number is ${number}`);
    // console.log(`number is 10`);
    
  }

  render(){
    return (
      <div className="component">
        <p onClick={this.handleClick}>First</p>
      </div>
    );
  }
    
}

// function First() {

//   return (
//     <div className="component">
//       <p>First</p>
//     </div>
//   );
// }

export default First;
