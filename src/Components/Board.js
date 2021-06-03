import React from 'react';
import "../Board.css";
import Square from './Square';

class Board extends React.Component {
  // Constructor is not here becouse Square component no longer 
  // keeps track of the game's state.

  // function checking if the Square should be selected (for winning move)
  checkSelected(currSquare, arrSelected) {
    let clName = "square";
    if (arrSelected && arrSelected.some(item => item === currSquare)) {
      clName = "square-selected";
    }
    return clName;
  }

  renderSquare(i) {
    return (
      <Square 
        value={ this.props.squares[i] }
        clName={ this.checkSelected(i, this.props.winSquares) }
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

  // Function for board creation (3 x 3 squares)
  createBoard = () => {
    let board = [];
    let index = 0;

    // Outer loop to create parent (rows)
    for (let i = 0; i < 3; i++) {
      let children = [];
      // inner loop to create children (columns)
      for (let j = 0; j < 3; j++) {
        children.push(this.renderSquare(index++));
      }
      // create parent and add the children
      board.push(<div className="board-row">{ children }</div>)
    }
    return board;
  }
  
  render() {

    return(
      <div>
        { this.createBoard() }

{/*
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
*/}
      </div>
    );
  }
}

export default Board;