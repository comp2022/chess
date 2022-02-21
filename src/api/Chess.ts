export type PieceType = 'pawn' | 'bishop' | 'knight' | 'rook' | 'queen' | 'king'; 

export interface Piece {
  isBlack: boolean; // false = white, true = black
  type: PieceType;
};

export type Board = (Piece | null)[][];

export interface Coordinate {
  row: number;
  col: number;
};

type MoveGenerator = (board: Board, coord: Coordinate) => Coordinate[];

const moveGenerators: Record<PieceType, MoveGenerator> = {
    'pawn': getPawnMoves,
    'bishop': getBishopMoves,
    'knight': getKnightMoves,
    'rook': getRookMoves,
    'queen': getQueenMoves,
    'king': getKingMoves
} 

export function getValidMoves(board: Board, coord: Coordinate): Coordinate[] {
    const currentPiece = board[coord.row][coord.col];
    if (currentPiece === null) return [];

    return moveGenerators[currentPiece.type](board, coord);
}

export function coordOOB(coord: Coordinate): boolean {
    return coord.row < 0 || coord.col < 0 || coord.row > 7 || coord.col > 7;
}

function getPawnMoves(board: Board, coord: Coordinate): Coordinate[] {
    const currentPiece = board[coord.row][coord.col];
    let currentColor = currentPiece?.isBlack; // true = black, false = white
    let moves: Coordinate[] = [];
    let row: number = 0;
    let colLeft = coord.col - 1;
    let colRight = coord.col + 1;

    // check moves for Black piece
    if (currentPiece?.isBlack) {
        // first pawn move 
        if (coord.row === 1) {
            if (board[coord.row + 2][coord.col] === null) moves.push({row: coord.row + 2, col: coord.col}) 
        }
        row = coord.row + 1;
    }
    // white
    if (!currentPiece?.isBlack) {
        // first pawn move 
        if (coord.row === 6) {
            if (board[coord.row - 2][coord.col] === null) moves.push({row: coord.row - 2, col: coord.col}) 
        }
        row = coord.row - 1;
    }
        // check for row out of bound
    if (row >= 0 && row <= 7) {
        // move 1 step forward if its empty square
        if (board[row][coord.col] === null) moves.push({row: row, col: coord.col});

        // move to take out enemy pawn
        if (colLeft >= 0 && board[row][colLeft] !== null &&  currentColor !== board[row][colLeft]?.isBlack) moves.push({row: row, col: colLeft})

        // move to take out enemy pawn
        if (colRight <= 7 && board[row][colRight] !== null && currentColor !== board[row][colRight]?.isBlack) moves.push({row: row, col: colRight})
    }
    
 
    
    return moves;
}

function getBishopMoves(board: Board, coord: Coordinate): Coordinate[] {
    let moves: Coordinate[] = [];
    return moves;
}

function getKnightMoves(board: Board, coord: Coordinate): Coordinate[] {
    let moves: Coordinate[] = [];
    
    const knightMove = [1, 2]; // used to generate all other moves
    for(let i = 0; i < 8; i++) {
        moves.push({
            row: coord.row + knightMove[i < 4 ? 0 : 1] * ((i & 0x1) === 1 ? -1 : 1),
            col: coord.col + knightMove[i < 4 ? 1 : 0] * ((i & 0x2) === 2 ? -1 : 1),
        });
    }

    return moves.filter(move => 
        !coordOOB(move) && // the move is inbounds
        board[move.row][move.col]?.isBlack !== board[coord.row][coord.col]?.isBlack // the cell does not have a piece of the same colour
    );
}

function getRookMoves(board: Board, coord: Coordinate): Coordinate[] {
    let moves: Coordinate[] = [];
    return moves;
}

function getQueenMoves(board: Board, coord: Coordinate): Coordinate[] {
    let moves: Coordinate[] = [];
    return moves;
}

function getKingMoves(board: Board, coord: Coordinate): Coordinate[] {
    let moves: Coordinate[] = [];
    return moves;
}