import React from 'react';
import "../Board.css";
import Square from './Square';

class Board extends React.Component {
  // Constructor is not here becouse Square component no longer 
  // keeps track of the game's state.

  renderSquare(i) {
    return (
      <Square 
        value={ this.props.squares[i] } 
        // Create a way for the Square to update Board's state. Since state is
        // considered to be private to a component that defines it, we cannot
        // update the Board's state directly from Square. Instead, we'll pass
        // down a function from the Board to the Square, and we'll have Square
        // call that function when a square is clicked.

        // In React, it's conventional to use handle[Event] names for methods
        // which handle the events.
        onClick={ () => this.props.onClick(i) }
      />
    );
  }

  render() {
    return(
      <div>
        <div className="board-row">
          { this.renderSquare(0) }
          { this.renderSquare(1) }
          { this.renderSquare(2) }
        </div>
        <div className="board-row">
          { this.renderSquare(3) }
          { this.renderSquare(4) }
          { this.renderSquare(5) }
        </div>
        <div className="board-row">
          { this.renderSquare(6) }
          { this.renderSquare(7) }
          { this.renderSquare(8) }
        </div>
      </div>
    );
  }
}

export default Board;