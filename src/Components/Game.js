import React from 'react';
import "../Game.css";
import Board from './Board';

class Game extends React.Component {
  constructor(props) {
    // Allways call "super" when defining the constructor of a subclass.
    // All React components classes that have constructor should start 
    // with a super(props) call.
    super(props);

    this.state = {
      // Top level Game component stores a list of past moves. This gives 
      // the full control over Board's data, and lets it instruct the Board 
      // to render previous turns from the history.
      history: [{
        // Board's initial state to contain an array of all squares
        // When we fill the board in later, the this.state.squares array
        // will look something like this:
        // [
        //  'O', null, 'X' 
        //  'X', X, 'O' 
        //  'O', null, null 
        // ]
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  // Positions X,Y that will be written into the button history
  static xyPositions = [
    ['[1, 1]'],
    ['[2, 1]'],
    ['[3, 1]'],
    ['[1, 2]'],
    ['[2, 2]'],
    ['[2, 3]'],
    ['[1, 3]'],
    ['[2, 3]'],
    ['[3, 3]'],
  ];

  // function that handles onClick event when Square is clicked on
  handleClick(i) {
    // this ensures if we "go back in time" and then make a new move
    // from that point, we throw away all the "future history" that
    // would now become incorrect
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    // Slice - create a copy of the array to modify instead of modifying
    // the existing array.
    const squares = current.squares.slice();

    // Ignore a click if someone has won the game or if Square is already clicked.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    // Store the state in the Board component instead of the individual 
    // Square components. When the Board's state changes, the Square components
    // re-render automatically. Keeping the state in the Board component will
    // allow it to determine the winner in the future.

    // The Square/Board components are CONTROLLED COMPONENTS. The Game component 
    // has full control over them.
    this.setState({
      // Unlike the push() method, the concat() method doesn't mutate 
      // the original array, so we prefer it.
      history: history.concat([{
        squares: squares,
        position: Game.xyPositions[i],
      }]),
      // this ensures we don't get stuck showing the same move after a new one
      // has been made
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      // stepNumber state reflects the move displayed to the user.
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    // render currently selected move according to stepNumber
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    // For each move in the game history create a list item <li>
    // which contains a button. Button has a onClick() handler which calls 
    // a method this.jumpTo()
    const moves = history.map((step, move) => {
      const desc = move ? 
        ('Go to move #' + move + ' at position: ' + history[move].position)
        : 'Go to game start';
      
      return (
        <li key={ move }>
          <button onClick={() => this.jumpTo(move)}>{ desc }</button>
        </li>
      );
    })

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return(
      <div className="game">
        <div className="game-board">
          <Board 
            squares={ current.squares }
            onClick={ (i) => this.handleClick(i) }
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

// Helper function checking if there is a winner. Called from Board's render.
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i=0; i<lines.length; i++) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game