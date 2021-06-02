
import React from 'react';
import "../Square.css";

class Square extends React.Component {
  constructor(props) {
    // Allways call "super" when defining the constructor of a subclass.
    // All React components classes that have constructor should start 
    // with a super(props) call.
    super(props);
    // initialize the state
    this.state = {
      value: null,
    };
  }

  render () {
    return(
      // Set state value to X when clicked on the square.
      // Calling setStare in a component, React automatically updates
      // the child components inside of it too.
      <button 
        className="square" 
        onClick={() => this.setState({value: 'X'})}
      >
        { this.state.value }
      </button>
    );
  }
}

export default Square;