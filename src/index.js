import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";
import { useEffect } from "react";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  

  renderSquare(i) {
    return (
      <Square
        value={this.props.value[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history
    const squares = history[history.length - 1].squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: this.state.history.concat([{squares: squares}]),
      xIsNext: !this.state.xIsNext,
    });
  }
  jumpTo(move){
    const history = this.state.history
    history.splice(move + 1, history.length-move);
    console.log(move === 0 || move === 2);
    this.setState({
      history: history,
      xIsNext: (move % 2) === 0
    })
  }

  render() {
    const history = this.state.history
    const current = history[history.length-1]
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + ' and continue':
        'Go to the start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board value = {current.squares} onClick = {(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// function Square(props) {
//   return (
//     <button className={props.winner} onClick={() => props.onClick()}>
//       {props.value}
//     </button>
//   );
// }

// class Board extends React.Component {

//   renderSquare(i) {
//     const winners = calculateWinner(this.props.squares);
//     if (winners) {
//       const winner = winners.includes(i) ? "square win" : "square";
//       return (
//         <Square
//           value={this.props.squares[i]}
//           onClick={() => this.props.handleClick(i)}
//           winner={winner}
//         />
//       );
//     }

//     return (
//       <Square
//         value={this.props.squares[i]}
//         onClick={() => this.props.handleClick(i)}
//         winner={"square"}
//       />
//     );
//   }

//   render() {
//     const status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;

//     return (
//       <div>
//         <div className="status">{status}</div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

// class Game extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       history: [{
//       squares: Array(9).fill(null),
//     }],
//       xIsNext: true,
//     }
//   }

//   handleClick(i) {
//     const squares = this.state.squares.slice();
//     if (squares[i] === null) {
//       squares[i] = this.state.xIsNext ? "X" : "O";
//       this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
//     }
//   }

//   render() {
//     const history = this.state.history;
//     const current = history[history.length - 1]
//     const winner = calculateWinner(current.squares);

//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board 
//           value={this.state.history}
//           onClick={() => this.handleClick()}
//           winner={'square'}/>
//         </div>
//         <div className="game-info">
//           <div>{/* status */}</div>
//           <ol>{/* TODO */}</ol>
//         </div>
//       </div>
//     );
//   }
// }

// // ========================================

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Game />);

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return [a, b, c];
//     }
//   }
//   return null;
// }
