import React from 'react';
import "../Board.css";
import Square from './Square';

class Board extends React.Component {
  constructor(props) {
    // Allways call "super" when defining the constructor of a subclass.
    // All React components classes that have constructor should start 
    // with a super(props) call.
    super(props);
    this.state = {
      // Board's initial state to contain an array of all squares
      // When we fill the board in later, the this.state.squares array
      // will look something like this:
      // [
      //  'O', null, 'X' 
      //  'X', X, 'O' 
      //  'O', null, null 
      // ]
      squares: Array(9).fill(null),
      // flag for next turn of the 'X' player
      xIsNext: true,
    };
  }

  // function that handles onClick event when Square is clicked on
  handleClick(i) {
    // Slice - create a copy of the array to modify instead of modifying
    // the existing array.
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    // Store the state in the Board component instead of the individual 
    // Square components. When the Board's state changes, the Square components
    // re-render automatically. Keeping the state in the Board component will
    // allow it to determine the winner in the future.

    // The Square components are CONTROLLED COMPONENTS. The Board component 
    // has full control over them.
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square 
        value={ this.state.squares[i] } 
        // Create a way for the Square to update Board's state. Since state is
        // considered to be private to a component that defines it, we cannot
        // update the Board's state directly from Square. Instead, we'll pass
        // down a function from the Board to the Square, and we'll have Square
        // call that function when a square is clicked.

        // In React, it's conventional to use handle[Event] names for methods
        // which handle the events.
        onClick={ () => this.handleClick(i) }
      />
    );
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return(
      <div>
        <div className="status">{ status }</div>
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