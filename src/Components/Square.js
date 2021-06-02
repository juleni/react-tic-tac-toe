
import React from 'react';
import "../Square.css";

class Square extends React.Component {
  // Constructor is not here becouse Square component no longer 
  // keeps track of the game's state.
  render () {
    return(
      // Set state value to X when clicked on the square.
      // Calling setStare in a component, React automatically updates
      // the child components inside of it too.
      <button 
        className="square" 
        // Props 'value' and 'onClick' are passing down from Board component.
        // When a Square is clicked, the onClick function provided by Board 
        // is called. Since the Board passed onClick={() => this.handleClick(i)}
        // to Square, the Square calls this.handleClick(i) when clicked.

        // In React, it's conventional to use on[Event] names for methods which
        // represent events.        
        onClick={() => this.props.onClick()}
      >
        { this.props.value }
      </button>
    );
  }
}

export default Square;