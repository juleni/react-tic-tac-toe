
import "../Square.css";

function Square(props) {
  // Square component is FUNCTION COMPONENT that only contain a 'render'
  // method and don't have their own state. Instead of defining a class
  // which extends React.Component, we can write function that takes 'props'
  // as an input and returns what should be rendered.

  // Constructor is not here becouse Square component no longer 
  // keeps track of the game's state.
  return(
    // Set state value to X when clicked on the square.
    // Calling setStare in a component, React automatically updates
    // the child components inside of it too.
      <button
        className={props.clName}
        // Props 'value' and 'onClick' are passing down from Board component.
        // When a Square is clicked, the onClick function provided by Board 
        // is called. Since the Board passed onClick={() => this.handleClick(i)}
        // to Square, the Square calls this.handleClick(i) when clicked.

        // In React, it's conventional to use on[Event] names for methods which
        // represent events.
        onClick={props.onClick}
      >
        { props.value }
      </button>
  );
}

export default Square;