# chess
Programming a chess game


## Piece

We can create an object to define the chess piece. 

The piece are distinguished through:
- __roles__: `rook`, `pawn`, `bishop`, `king` and `queen`
- __score__: we can assign them score based on the role, with king being `infinite`
- __color__: `black` or `white`

The game state can be implemented with the `state` design pattern. A player can only move if
- it is the player turn (determine by the `color` of the piece)
- it is a valid move (must not overlap with the same color, is not check/stalemate)


Let's take a look at how to design a `knight`:
```js
class Knight {
  constructor(x, y, color) {
    // Initialize with the initial position.
    this.x = x
    this.y = y
    this.color = color
    this.direction = color === 'white' ? 1 : -1
  }
  static moves() {
    // The possible moves that it can make, excluding invalid moves.
    return [
      {x: 2, y: 1},
      {x: 2, y: -1},
      {x: -2, y: 1},
      {x: -2, y: -1},
      {x: 1, y: 2},
      {x: 1, y: -2},
      {x: -1, y: 2},
      {x: -1, y: -2},
    ]
  }
  isValidMove(newX, newY) {
    const [head, tail] = [Math.abs(newX), Math.abs(newY)]
    if (!(head === 1 && tail === 2)) {
      throw new Error('invalid move')
    }
    this.x += newX
    this.y += newY
    return { x: this.x, y: this.y }
  }
}
```

## Board

We need to ensure that the pieces can only move:
- within the boundary of the board
- not overlapping with other pieces

```js
class Board {
  constructor() {
    this.board = []
    this.pieces = []
  }
  setup () {
  
  }
  canMove(piece) {
     
  }
}
```
