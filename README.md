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

## Bitboards

```go
package main

import (
	"fmt"
)

func main() {

	var blackRooks uint64 = 1<<7 | 1<<0
	var blackKnights uint64 = 1<<6 | 1<<1
	var blackBishops uint64 = 1<<5 | 1<<2
	var blackKing uint64 = 1 << 3
	var blackQueen uint64 = 1 << 4

	var whiteRooks uint64 = 1<<(63-7) | 1<<(63)
	var whiteKnights uint64 = 1<<(63-6) | 1<<(63-1)
	var whiteBishops uint64 = 1<<(63-5) | 1<<(63-2)
	var whiteKing uint64 = 1 << (63 - 4)
	var whiteQueen uint64 = 1 << (63 - 3)

	var blackPawns uint64 = 0
	var whitePawns uint64 = 0
	for i := 0; i < 8; i++ {
		blackPawns |= 1 << uint(8+i)
		whitePawns |= 1 << uint(63-15+i)
	}

	var whitePieces = whiteKnights | whiteRooks | whiteBishops | whiteKing | whiteQueen | whitePawns
	var blackPieces = blackKnights | blackRooks | blackBishops | blackKing | blackQueen | blackPawns

	fmt.Printf("blackRooks  : %064b\n", blackRooks)
	fmt.Printf("blackKnights: %064b\n", blackKnights)
	fmt.Printf("blackBishops: %064b\n", blackBishops)
	fmt.Printf("blackKing   : %064b\n", blackKing)
	fmt.Printf("blackQueen  : %064b\n", blackQueen)
	fmt.Printf("blackPawns  : %064b\n", blackPawns)
	fmt.Printf("blackPieces : %064b\n", blackPieces)

	fmt.Printf("whiteRooks  : %064b\n", whiteRooks)
	fmt.Printf("whiteKnights: %064b\n", whiteKnights)
	fmt.Printf("whiteBishops: %064b\n", whiteBishops)
	fmt.Printf("whiteKing   : %064b\n", whiteKing)
	fmt.Printf("whiteQueen  : %064b\n", whiteQueen)
	fmt.Printf("whitePawns  : %064b\n", whitePawns)
	fmt.Printf("whitePieces : %064b\n", whitePieces)

	// Example of pawn move at g2, printed into a board.
	var canMove uint64 = 1<<(9+8) | 1<<(9*2-1+8)
	fmt.Println("canMove")
	printBoard(canMove)

	var canEat uint64 = 1<<(9+8-1) | 1<<(9+8+1)
	fmt.Println("canEat")
	printBoard(canEat)

	newWhitePieces := whitePieces | 1<<(9+8-1)

	fmt.Println("newWhitePieces")
	pawnMove := ^blackPieces & ((newWhitePieces & canEat) | canMove)
	printBoard(pawnMove)

	for i := 0; i < 64; i++ {
		fmt.Printf("(%d, %d): %d", i%8, 7-i/8, translateMove(i%8, 7-i/8))
		if i != 0 && i%8 == 7 {
			fmt.Println()
		}
	}
}

func printBoard(board uint64) {
	for i := 0; i < 8; i++ {
		fmt.Println(fmt.Sprintf("%064b", board)[i*8 : (i+1)*8])
	}
	fmt.Println()
}

func translateMove(x, y int) int {
	return x + (7-y)*8
}
```

## References
- chess bitboard https://chess.stackexchange.com/questions/2831/how-to-represent-chess-state-with-a-bitboard
