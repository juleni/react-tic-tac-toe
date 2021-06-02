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
    };
  }

  renderSquare(i) {
    return <Square value={ this.state.squares[i] } />;
  }

  render() {
    const status = 'Next player: X';

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