const Pawn = 1 << 0
const Knight = 1 << 1
const Bishop = 1 << 2
const Rook = 1 << 3
const Queen = 1 << 4
const King = 1 << 5

const getPieceType = {
  [Pawn]: 'pawn',
  [Knight]: 'knight',
  [Bishop]: 'bishop',
  [Rook]: 'rook',
  [Queen]: 'queen',
  [King]: 'king'
}

function isWithinBoundary (p, size = 8) {
  return p > -1 && p < size
}

class Board {
  constructor (size = 8) {
    this.grid = Array(size).fill(null).map(() => Array(size).fill(null))
  }
  has (x, y) {
    return !!this.grid[x][y]
  }
  set (x, y, piece) {
    if (!isWithinBoundary(x) || !isWithinBoundary(y)) throw new Error('out of bound')
    this.grid[x][y] = piece
  }
  get (x, y) {
    return this.grid[x] && this.grid[x][y]
  }
}

class Piece {
  constructor (x, y, type, color) {
    this.x = x
    this.y = y
    this.type = type
    this.color = color
  }
}

class Chess {
  constructor () {
    this.board = new Board()
    this.turn = 0
    this.isChecked = false
    this.pieces = [
      new Piece(0, 0, Rook, 'white'),
      new Piece(1, 0, Knight, 'white'),
      new Piece(2, 0, Bishop, 'white'),
      new Piece(3, 0, Queen, 'white'),
      new Piece(4, 0, King, 'white'),
      new Piece(5, 0, Bishop, 'white'),
      new Piece(6, 0, Knight, 'white'),
      new Piece(7, 0, Rook, 'white'),

      new Piece(0, 1, Pawn, 'white'),
      new Piece(1, 1, Pawn, 'white'),
      new Piece(2, 1, Pawn, 'white'),
      new Piece(3, 1, Pawn, 'white'),
      new Piece(4, 1, Pawn, 'white'),
      new Piece(5, 1, Pawn, 'white'),
      new Piece(6, 1, Pawn, 'white'),
      new Piece(7, 1, Pawn, 'white'),

      new Piece(0, 7, Rook, 'black'),
      new Piece(1, 7, Knight, 'black'),
      new Piece(2, 7, Bishop, 'black'),
      new Piece(3, 7, Queen, 'black'),
      new Piece(4, 7, King, 'black'),
      new Piece(5, 7, Bishop, 'black'),
      new Piece(6, 7, Knight, 'black'),
      new Piece(7, 7, Rook, 'black'),

      new Piece(0, 6, Pawn, 'black'),
      new Piece(1, 6, Pawn, 'black'),
      new Piece(2, 6, Pawn, 'black'),
      new Piece(3, 6, Pawn, 'black'),
      new Piece(4, 6, Pawn, 'black'),
      new Piece(5, 6, Pawn, 'black'),
      new Piece(6, 6, Pawn, 'black'),
      new Piece(7, 6, Pawn, 'black')
    ]
    this.pieces.forEach(piece => {
      if (this.board.has(piece.x, piece.y)) {
        console.log('position is occupied')
        return
      }
      this.board.set(piece.x, piece.y, piece)
      // Draw()
    })
  }
  whiteTurn () {
    return this.turn % 2 === 0
  }
  blackTurn () {
    return this.turn % 2 === 1
  }
  whoseTurn () {
    return this.whiteTurn() ? 'white' : 'black'
  }
  possibleMoves (typeTurn) {
  }
}

function main () {
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')
  const dimension = 320 // Math.floor(Math.min(window.innerWidth, window.innerHeight) / 8) * 8
  const size = 8
  const grid = dimension / size
  canvas.width = dimension
  canvas.height = dimension

  // Draw grid.
  drawGrid(context, dimension)

  const chess = new Chess()
  chess.pieces.forEach((piece) => {
    drawPiece(context, piece.x, 7 - piece.y, getPieceType[piece.type], dimension, piece.color)
  })

  canvas.addEventListener('click', function (event) {
    const x = Math.floor(event.offsetX / grid)
    const y = Math.floor(event.offsetY / grid)
    const piece = chess.board.get(x, y)
    console.log(piece.color, getPieceType[piece.type])

    if (getPieceType[piece.type] === 'pawn') {
      console.log(pawnMove(chess.board, piece))
    }
  })
}

function drawGrid (context, dimension, size = 8) {
  context.beginPath()
  const grid = dimension / size
  for (let i = 0; i < size; i += 1) {
    // Horizontal.
    context.moveTo(0, i * grid)
    context.lineTo(dimension, i * dimension)

    // Vertical.
    context.moveTo(i * grid, 0)
    context.lineTo(i * grid, dimension)
  }
  context.closePath()
  context.strokeStyle = 'black'
  context.stroke()
}

function drawPiece (context, posX, posY, text, dimensions, color) {
  const isWhite = color === 'white'
  const dimension = dimensions / 8
  const padding = 5
  const [x, y, radius] = [dimension / 2 + dimension * posX, dimension / 2 + dimension * posY, (dimension - 2 * padding) / 2]
  // const textMetric = context.measureText(text)
  // const offsetX = textMetric.width / 2

  context.beginPath()
  context.arc(x, y, radius, 0, 2 * Math.PI)
  // context.addHitRegion({id: `${x}:${y}:${text}:${color}`})
  context.closePath()
  if (isWhite) {
    context.strokeStyle = 'black'
    context.stroke()
  } else {
    context.fillStyle = 'black'
    context.fill()
  }

  context.beginPath()
  context.font = '12px arial'
  context.fillStyle = isWhite ? 'black' : 'white'
  context.fillText(text, x, y)
  context.textAlign = 'center'
  context.closePath()
}

function pawnMove (board, {x: prevX, y: prevY, color}) {
  const direction = color === 'white' ? 1 : -1
  const moves = [
    [-1, 1 * direction],
    [1, 1 * direction],
    [0, 1 * direction],
    [0, 2 * direction]
  ]

  const valid = []
  for (let move of moves.slice(0, 2)) {
    const [nextX, nextY] = move
    const [x, y] = [prevX + nextX, prevY + nextY]
    const piece = board.get(x, y)
    if (piece && piece.color !== color) {
      valid.push({x, y})
    }
  }

  for (let move of moves.slice(2, moves.length)) {
    const [nextX, nextY] = move
    const [x, y] = [prevX + nextX, prevY + nextY]
    if (!board.get(x, y)) {
      valid.push({x, y})
    }
  }
  return valid
}

main()
